
const express = require("express");
const router  = express.Router();

const sendEmailPassReset = require("../../services/emailServices/SendEmailPassReset");
const findUser = require("../../services/userServices/findUser");
const findToken = require('../../services/tokenServices/findToken');
const createToken = require("../../services/tokenServices/createToken");
const deleteToken = require("../../services/tokenServices/deleteToken");

//Sends mail with password reset link to the provided email
router.post("/password-reset",async(req,res)=>{
    try{
        const user = await findUser(req,res);
        if(!user){
            return;
        }
        //Find token attached to the user,if it exists, delete it, then create a new one(Makes only the last link valid)
        const token = await findToken(req,res,user);
       
        if(token){
            await deleteToken(req,res,token,user);
        }
        const Token = await createToken(user);
        //Send the mail to the given email
        await sendEmailPassReset(req,res,user,Token.token);
        res.status(200).send({message:"Email successfully sent"});

    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})
module.exports = router;