
const express = require("express");
const router  = express.Router();
const findUser = require("../../services/userServices/findUser");
const passwordDecription = require("../../services/passwordDecription");
const userVerification = require("../../services/userServices/userVerification");
//When the user tries to login, check if the email exists,check if the account is verified and passwords match
//After that we initialize a jasonwebtoken and return it to the clientside
router.post("/login",async (req,res)=>{
    try{
        const user = await findUser(req,res);
        if(!user){
            return ;
        }
        if(!await passwordDecription(req,res,user)){
            return;
        }
        await userVerification(req,res,user);
    }
    catch(err){
        res.status(400).send({
            message:"An error has occured",
            err
        })
    }
})
module.exports = router;