const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    projectName:{
        type:String,
        required:true
    },
    ticketTitle:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    ticketAuthor:{
        type:String,
        required:true,
      
    },
    status:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
      
    },
    type:{
        type:String,
        required:true
    },
    assignedDevs:[{
        type:String

    }],
    createdAt:{type:Date,default:Date.now()}
})
const model = mongoose.model("ticket",ticketSchema);
module.exports = model;