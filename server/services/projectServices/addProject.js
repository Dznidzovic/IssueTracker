const projectModel = require('../../MongoDB/projectModel');

module.exports = async(req,res)=>{
    const project = await new projectModel({
        projectName:req.body.projectName,
        projectDescription:req.body.projectDescription,
        contributors:req.body.selectedContributors
    }).save();
    return project;
}