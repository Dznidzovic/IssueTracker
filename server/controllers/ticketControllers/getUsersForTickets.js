const express = require('express');
const returnAvailableUsersforTickets = require('../../services/ticketServices/returnAvailableUsersforTickets');
const router = express.Router();



//gets all the users that are eligible to be assigned to a ticket based on project contributors
router.post("/get-users-for-tickets", async(req,res)=>{
    try{
      
        const usersForTicket = await returnAvailableUsersforTickets(req,res);
        res.status(200).send({message:"Users found",usersForTicket});
       

    }
    catch(err){
        res.status(400).send({message:"Error has occured"});
    }
})

module.exports = router;