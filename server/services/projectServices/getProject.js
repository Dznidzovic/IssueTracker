const projectModel = require('../../MongoDB/projectModel');


module.exports = async(req,res)=>{
    if(req.body.id){
        var project = await projectModel.findOne({_id:req.body.id});
       
    }
    else if(req.body.currentProjectName){
        var project = await projectModel.findOne({projectName:req.body.currentProjectName});
      
    }
    return project;
}