const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    currentProjectName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{type:Date,default:Date.now()}
      
})
const model = mongoose.model("comment",commentSchema);
module.exports = model;