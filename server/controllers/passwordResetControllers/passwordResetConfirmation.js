
const express = require("express");
const router  = express.Router();
const userModel = require('../../MongoDB/userModel');
const verifyToken = require('../../services/tokenServices/verifyToken');
const changeUserPassword = require("../../services/userServices/changeUserPassword");
const deleteToken = require("../../services/tokenServices/deleteToken");


//Once the user is redirected to the password reset link in the email, this request is sent
router.post("/:id/password-reset/:token", async(req,res)=>{
    try{
        //Fetch the user
        const user = await userModel.findOne({_id:req.params.id});
        if(!user){
            return;
        }
        console.log("aaa");
        //Verify token
        const token = await verifyToken(req,res);

        if(!token){
            return;
        }
        const updatePassword = await changeUserPassword(req,res,user);
        if(!updatePassword){
            return;
        }
        console.log("aaa");
        //Delete the token after changing the password
        const deletedToken = await deleteToken(req,res,token,user);
        if(!deletedToken){
            return;
        }
        console.log("aaa");
        res.status(200).send({message:"Password has been updated"});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
    
    

})
module.exports = router;