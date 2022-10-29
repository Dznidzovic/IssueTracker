const ticketModel = require('../../MongoDB/ticketModel');

module.exports = async(req,res)=>{
        const deletedTicket = await ticketModel.findOneAndDelete({ticketTitle:req.body.ticket});
        if(!deletedTicket){
           return res.status(404).send({message:"Ticket not Deleted",err});
        }
        
        const newTickets = await ticketModel.find({});
        if(!newTickets){
            return res.status(404).send({message:"Tickets not found"});
        }

        return [newTickets,deletedTicket];
}