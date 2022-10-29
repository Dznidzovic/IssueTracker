const express = require('express');
const findComment = require('../../services/commentServices/findComment');
const router = express.Router();

router.post("/get-comments", async(req,res)=>{
    try{
        const comments = await findComment(req,res);
        if(!comments){
            return res.status(404).send({message:"Comments not found"});
        }
        res.status(201).send({message:"Comments found",comments})
    }
    catch(err){
        res.status(404).send({message:"Error has occured"});
    }

})
module.exports = router;