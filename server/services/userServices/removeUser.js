const userModel = require('../../MongoDB/userModel');
const ticketModel = require('../../MongoDB/ticketModel');
const projectModel = require('../../MongoDB/projectModel');



module.exports = async(req,res)=>{
    const user = await userModel.findById({_id:req.body.id});
    const userName = user.firstName + " "+ user.secondName;

    if(!user){
        return res.status(404).send({message:"User not found"});
    }
    const deletedUser = await user.delete();
    if(!deletedUser){
        return res.status(404).send({message:"User not deleted"});
    }
    //Delete user from project contributors
    const projects = await projectModel.find({});
    if(!projects){
        return res.status(404).send({message:"Projects not found"});
    }
    for(let i=0;i<projects.length;i++){
        for(let j = 0;j<projects[i].contributors.length;j++){
            if(projects[i].contributors[j]===userName){
                projects[i].contributors = [...projects[i].contributors.slice(0,j),...projects[i].contributors.slice(j+1,projects[i].contributors.length)];
            }
        }
        const saveProject = await projects[i].save();
    }
    const tickets = await ticketModel.find({});
    if(!tickets){
        return res.status(404).send({message:"Projects not found"});
    }
    for(let i=0;i<tickets.length;i++){
        for(let j = 0;j<tickets[i].assignedDevs.length;j++){
            if(tickets[i].assignedDevs[j]===userName){
                tickets[i].assignedDevs = [...tickets[i].assignedDevs.slice(0,j),...tickets[i].assignedDevs.slice(j+1,tickets[i].assignedDevs.length)];
            }
        }
        const saveTicket = await tickets[i].save();
    }
   
    const allusers = await userModel.find({});
    return allusers
}