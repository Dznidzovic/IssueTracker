const express = require('express');
const router = express.Router();
const addTicket = require('../../services/ticketServices/addTicket');

//Request creates a ticket and returns it to the client
router.post("/create-ticket", async(req,res)=>{
    try{
        console.log("uslo1");
        const newTicket = await addTicket(req,res);
        if(!newTicket){
            return res.status(404).send({message:"Ticket not created"});
        }
        res.status(201).send({message:"Ticket Saved",newTicket});
    }
    catch(err){
     res.status(400).send({message:"Error has occured",err});
    }
 
 })

module.exports = router;