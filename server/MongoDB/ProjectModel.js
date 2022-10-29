const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    projectName:{
        type:String,
        required:true,
        unique:true
    },
    projectDescription:{
        type:String,
        required:true,
        unique:true
    },
    contributors:[{
        type:String
    }],
    createdAt:{type:Date,default:Date.now()}
      
})
const model = mongoose.model("project",projectSchema);
module.exports = model;