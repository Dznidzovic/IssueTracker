const projectModel = require('../../MongoDB/projectModel');
const ticketModel = require('../../MongoDB/ticketModel');
const userModel = require('../../MongoDB/userModel');

module.exports = async(req,res)=>{
    
    const updatedProjectUsers = [];
    const project = await projectModel.findOne({projectName:req.body.currentProjectName});
    if(!project){
        res.status(404).send({message:"Project not found"});
    }
  
    const contributors = project.contributors;
    const deletedContributor = contributors.splice(contributors.indexOf(req.body.member),1);
    project.contributors = contributors;
    await project.save();

    //If a member is removed from a project, delete them from tickets aswell
    const tickets = await ticketModel.find({});
    const ticketsForCurrentProject = [];
    for(let i = 0;i<tickets.length;i++){
        if(tickets[i].projectName===req.body.currentProjectName){
            ticketsForCurrentProject.push(tickets[i]);
        }
    }
  
    for(let i = 0;i<ticketsForCurrentProject.length;i++){
        for(let j = 0;j<ticketsForCurrentProject[i].assignedDevs.length;j++){
            if(ticketsForCurrentProject[i].assignedDevs[j]===req.body.member){
                ticketsForCurrentProject[i].assignedDevs = [...ticketsForCurrentProject[i].assignedDevs.slice(0,j),...ticketsForCurrentProject[i].assignedDevs.slice(j+1,ticketsForCurrentProject[i].assignedDevs.length)];
            }
        }
    }

    for (let i = 0;i<tickets.length;i++){
        for(let j=0;j<ticketsForCurrentProject.length;j++){
            if(tickets[i].ticketTitle===ticketsForCurrentProject[j].ticketTitle){
                tickets[i].assignedDevs = ticketsForCurrentProject[j].assignedDevs;
            }
        }
        await tickets[i].save();
    }

    for(let i = 0;i<contributors.length;i++){
        const firstName = contributors[i].split(" ")[0];
        const secondName = contributors[i].split(" ")[1];
        const user = await userModel.findOne({firstName:firstName,secondName:secondName});
        updatedProjectUsers.push([user]);
    }
    return updatedProjectUsers
}