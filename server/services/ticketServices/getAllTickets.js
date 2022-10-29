const ticketModel = require("../../MongoDB/ticketModel");

module.exports = async()=>{
    const tickets = ticketModel.find({});
    return tickets
}