const mongoose = require('mongoose');
require('dotenv').config();
//Defining the function that connects the app to the mongodb database
async function dbConnect(){
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Connection Successfull");
    }).catch((err)=>{
        console.log("Unable to connect");
        console.log(err);
    })
}
module.exports = dbConnect;