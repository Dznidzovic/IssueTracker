const express = require('express');
const addComment = require('../../services/commentServices/addComment');
const router = express.Router();

router.post("/create-comment", async(req,res)=>{
    try{
        const newComment = await addComment(req,res);
        if(!newComment){
            return res.status(404).send({message:"Comment Not created"});
        }
        res.status(201).send({message:"Comment Created",newComment})

    }
    catch(err){
        res.status(400).send({message:"Error has occured"});
    }
})
module.exports = router;