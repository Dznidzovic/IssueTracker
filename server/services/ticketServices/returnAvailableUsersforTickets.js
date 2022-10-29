const userModel = require('../../MongoDB/userModel');
const projectModel = require('../../MongoDB/projectModel');
module.exports = async(req,res)=>{
        const usersForTicket = [];
        const users = await userModel.find({});
        if(!users){
            return;
        }
        const project = await projectModel.find({projectName:req.body.currentProjectName});
        if(!project){
            return;
        }
        for(let j = 0 ;j<users.length;j++){
            const fullName = users[j].firstName+" "+users[j].secondName;
            for(let i = 0; i<project[0].contributors.length;i++){
                if(project[0].contributors[i]===fullName){
                    usersForTicket.push(users[j]);
                }
            }
        }
        return usersForTicket;
}