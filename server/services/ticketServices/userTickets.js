const ticketModel = require('../../MongoDB/ticketModel');

module.exports = async(req,res)=>{
    const userTickets = [];
    const tickets = await ticketModel.find({});
    if(!tickets){
        return res.status(404).send({message:"tickets not found"});
    }
    for(let i = 0;i<tickets.length;i++){
        for(let j = 0;j<tickets[i].assignedDevs.length;j++){
            if(tickets[i].assignedDevs[j]===req.body.currentUser){
                userTickets.push(tickets[i]);
            }
        }
    }
    return userTickets;
}