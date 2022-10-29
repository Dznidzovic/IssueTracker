
const mongoose = require("mongoose");
//Setting up userSchema

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide a first name"],
        unique: false
        
    },
    secondName:{
        type:String,
        required:[true,"Please provide an email"],
        unique: false
        
    },
    phoneNumber:{
        type:String,
        required:[true,"Please provide an email"],
        unique:[true,"This number is already in use"]
        
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:[true,"This email is already in use"]
        
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique: false
    },
    verified:{
        type:Boolean,
        default:false
    }
    ,
    admin:{
        type:Boolean,
        default:false
    }
    
});
const model = mongoose.model("Users",userSchema);
model.createIndexes();
module.exports = model;
