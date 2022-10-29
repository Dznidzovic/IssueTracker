const ticketModel = require('../../MongoDB/ticketModel');


module.exports = async(req,res)=>{
    console.log("uslo2");
    console.log(req.body);
    const newTicket = await new ticketModel({
        projectName:req.body.projectName,
        ticketTitle:req.body.ticketTitle,
        ticketAuthor:req.body.ticketAuthor,
        description:req.body.ticketDescription,
        status:req.body.status,
        priority:req.body.priority,
        type:req.body.type,
        assignedDevs:req.body.assignedDevs
    }).save();

    return newTicket;
}