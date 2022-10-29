
const express = require("express");
const router  = express.Router();

const findUser = require('../../services/userServices/findUser');

//Checks if user with the given email exists and returns it
router.post("/emailexists",async(req,res)=>{
    try{
        const user = await findUser(req,res);
        if(!user){
            return;
        }
        res.status(200).send({message:"User found",user});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;