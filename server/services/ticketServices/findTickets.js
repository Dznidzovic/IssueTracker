const ticketModel = require('../../MongoDB/ticketModel');
module.exports = async(projectName)=>{
    const tickets = await ticketModel.find({projectName:projectName});
    return tickets;
}