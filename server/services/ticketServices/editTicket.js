const ticketModel = require('../../MongoDB/ticketModel');

module.exports = async(req,res)=>{
    const updatedTicket = await ticketModel.replaceOne({ticketTitle:req.body.currentTicket},{
        ticketTitle:req.body.ticket.ticketTitle,
        projectName:req.body.ticket.currentProject,
        description:req.body.ticket.descripiton,
        ticketAuthor:req.body.ticket.ticketAuthor,
        status:req.body.ticket.status,
        priority:req.body.ticket.priority,
        type:req.body.ticket.type,
        assignedDevs:req.body.ticket.assignedDevs,
        createdAt:req.body.ticket.createdAt
    })
    if(!updatedTicket){
        return res.status(404).send({message:"Ticket not updated"});
    }
    const userTickets = []
    const allTickets = await ticketModel.find({});


    for(let i = 0;i<allTickets.length;i++){
        for(let j = 0;j<allTickets[i].assignedDevs.length;j++){
            if(allTickets[i].assignedDevs[j]===req.body.currentUser){
                userTickets.push(allTickets[i]);
            }
        }
    }

    return [allTickets,userTickets]
}