const express = require('express');
const router = express.Router();
const usersAvailable = require('../../services/userServices/availableUsers');
 
//Get all the users, compare them to the currentUsers array that we provide, find the difference in 2 arrays and send that difference
router.post("/get-available-users", async(req,res)=>{

    try{
     const availableUsers = await usersAvailable(req,res);
     res.status(200).send({message:"Available users found!",availableUsers})
    }
    catch(err){
     res.status(400).send({message:"Error has occured",err});
    }
    
 })
module.exports = router;