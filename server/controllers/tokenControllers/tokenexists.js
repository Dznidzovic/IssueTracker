
const express = require("express");
const findToken = require("../../services/tokenServices/findToken");
const router  = express.Router(); 


//Fetch a token from the database using given token
router.post("/token-exists",async(req,res)=>{
    try{
       
       if(!await findToken(req,res)){
        return;
       } 
       res.status(200).send({message:"Token found"});
    }
    catch(err){
         res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;