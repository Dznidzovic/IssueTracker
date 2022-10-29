const commentModel = require('../../MongoDB/commentModel');

module.exports = async(req,res)=>{
    const newComment = await new commentModel({
        currentProjectName:req.body.currentProjectName,
        author:req.body.author,
        text:req.body.text
    }).save();
    if(!newComment){
       return res.status(404).send({message:"Comment not created"});
    }
    return newComment;
}