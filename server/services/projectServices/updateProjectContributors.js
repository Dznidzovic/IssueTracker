const userModel = require('../../MongoDB/userModel');
const projectModel = require('../../MongoDB/projectModel');

module.exports = async(req,res)=>{
    const returnUpdatedUsers = [];
    const membersToBeUpdated = req.body.selectedMembersArray;
    const project = await projectModel.findOne({projectName:req.body.currentProjectName});
    if(!project){
        return res.status(400).send({message:"Project not found"});
    }
    const projectContributors = project.contributors;
    const updatedContributors = [...projectContributors,...membersToBeUpdated];
    if(updatedContributors.length>5){
        return res.status(400).send({message:"Maximum 5 developers"});
    }
    project.contributors = updatedContributors;

    const projectUpdated = await project.save();
    if(!projectUpdated){
       return res.status(404).send({message:"Project not updated"});
    }
    for(let i = 0;i<updatedContributors.length;i++){
        const firstName = updatedContributors[i].split(" ")[0];
        const secondName = updatedContributors[i].split(" ")[1];
        const user = await userModel.findOne({firstName:firstName,secondName:secondName});
        returnUpdatedUsers.push([user]);
    }
    return returnUpdatedUsers;
}
