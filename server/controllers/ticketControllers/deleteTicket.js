const express = require("express");
const removeTickets = require("../../services/ticketServices/removeTickets");
const router = express.Router();


//Request deletes one ticket based on ticket title provided in body section. Deleted ticket and New tickets are returned to the client
router.delete("/ticket-delete", async(req,res)=>{
    try{
   
        const removeTicket = await removeTickets(req,res);
        const deletedTicket = removeTicket[1];
        const newTickets = removeTicket[0];
        if(!removeTickets){
            return res.status(404).send({message:"Something went wrong"});
        }
        res.status(200).send({message:"Ticket deleted",deletedTicket,newTickets});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }

})
module.exports = router;