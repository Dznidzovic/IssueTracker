const express = require("express");
const router  = express.Router();
const sendEmail = require("../../services/emailServices/SendEmail");
const addUser = require("../../services/userServices/addUser");
const createToken = require("../../services/tokenServices/createToken");

//Defining a post request that will save the newly registered user to the database
//If the user with the same email or password already exists, the request will not go through because of how we set up userModel
router.post("/register",async(req,res)=>{
    try{
        const user = await addUser(req);
        if(!user){
            return res.status(404).send({message:"User not added"});
        }
        const Token = await createToken(user);
        if(!Token){
            return res.status(404).send({message:"Token not created"});
        }
        //Sending the email
        await sendEmail(req,res,user,Token.token);
        res.status(201).send({message:"Account has been created"});
        }
    catch(error){
        res.status(501).send({message:"An error has occured",error});
    }
})
module.exports = router;