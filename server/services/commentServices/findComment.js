const commentModel = require('../../MongoDB/commentModel');

module.exports = async(req,res)=>{
    const comments = await commentModel.find({currentProjectName:req.body.currentProjectName}); 
    return comments;
}