const express = require('express');
const router = express.Router();
const commentModel = require('../../MongoDB/commentModel');

router.delete("/delete-comment", async(req,res)=>{
    try{

        const deletedComment = await commentModel.findOneAndDelete({_id:req.body.id});
   
        if(!deletedComment){
            res.status(404).send({message:"Comment not deleted"});
        }
        res.status(200).send({message:"Comment deleted",deletedComment})
    }
    catch(err){
        res.status(400).send({message:"Error has occured"});
    }
})
module.exports = router;