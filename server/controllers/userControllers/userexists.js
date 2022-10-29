const express = require('express');
const findUser = require('../../services/userServices/findUser');
const router = express.Router();

//Checks if a user with given id exists and returns it
router.post("/userexists",async(req,res)=>{
    try{
       const user = findUser(req,res);
       console.log(user);
       if(!user){
            return;
       }
       res.status(200).send({message:"User found"});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})
module.exports = router;
