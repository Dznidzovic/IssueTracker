const express = require('express');
const usersTickets = require('../../services/ticketServices/userTickets');
const router = express.Router();

//fetch all tickets belonging to the user
router.post("/user-tickets", async(req,res)=>{
    try{
        const userTickets = await usersTickets(req,res);
        if(!userTickets){
            return res.status(404).send({message:"User tickets not found"});
        }
        res.status(200).send({message:"Tickets found",userTickets});
        }   
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;