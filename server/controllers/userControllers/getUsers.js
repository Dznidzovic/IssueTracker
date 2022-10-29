const express = require('express');
const router = express.Router();
const getAllUsers = require('../../services/userServices/getAllUsers');

//Fetch all the users in the database
router.get("/get-users", async(req,res)=>{
    try{
        const users = await getAllUsers();
        if(!users){
            return res.status(404).send({message:"Users not found"});
        }
        res.status(200).send({message:"Users successfully found",users});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;