const express = require('express');
const router = express.Router();
const getUserByContributors = require('../../services/userServices/getUserByContributors');
//Once we have the contributors for the given project, loop through them and find every user that matches their names, then send the users.
router.post("/get-users-contributors", async(req,res)=>{
    try{
        
        const users = await getUserByContributors(req,res);
       
        res.status(200).send({message:"Users found",users})

    }
    catch(err){
     res.status(400).send({message:"Error has occured",err})
    }
 })
 module.exports = router;