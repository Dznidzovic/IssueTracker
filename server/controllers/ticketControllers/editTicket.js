const express = require('express');
const editTicket = require('../../services/ticketServices/editTicket');
const router = express.Router();

//Edit the existing ticket
router.put("/edit-ticket", async(req,res)=>{
    try{
        const editedTicket = await editTicket(req,res);
        const allTickets = editedTicket[0];
        const userTickets = editedTicket[1];
        res.status(200).send({message:"Ticket updated",allTickets,userTickets});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})
module.exports = router;