const userModel = require('../../MongoDB/userModel');
const ticketModel = require('../../MongoDB/ticketModel');
const projectModel = require('../../MongoDB/projectModel');

module.exports = async(req,res)=>{
    const updateUser = await userModel.updateOne({_id:req.body.id},{
        firstName:req.body.firstname,
        secondName:req.body.secondname,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        admin:req.body.admin
    })
    if(!updateUser){
        return res.status(404).send({message:"User not found"});
    }
 
    const previousName = req.body.previousName;
    const newName = req.body.firstname+" "+req.body.secondname;
    const projects = await projectModel.find({});
    for(let i = 0; i<projects.length;i++){
        for(let j=0;j<projects[i].contributors.length;j++){
            if(projects[i].contributors[j]===previousName){
                projects[i].contributors[j] = newName;
            }
        }
        const saveProject = await projects[i].save();
    }

 
    
    const tickets = await ticketModel.find({});
    for(let i = 0;i<tickets.length;i++){
        for(let j = 0;j<tickets[i].assignedDevs.length;j++){
            if(tickets[i].assignedDevs[j]===previousName){
                tickets[i].assignedDevs[j] = newName;
            }
        }
        const saveTicket =  await tickets[i].save();
       
    }
    
    const allusers = await userModel.find({});
    return allusers;
}