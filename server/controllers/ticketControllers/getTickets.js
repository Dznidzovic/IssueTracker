const express = require('express');
const getAllTickets = require('../../services/ticketServices/getAllTickets');
const router = express.Router();

//Request fetches all the tickets and returns them to the client
router.get("/get-tickets", async(req,res)=>{
    try{
     const tickets = await getAllTickets();
     if(!tickets){
         return res.status(404).send({message:"Tickets not found"});
     }
     res.status(200).send({message:"Tickets found",tickets});
    }
    catch(err){
     res.status(400).send({message:"Error has occured",err});
    }
 })
 module.exports = router;