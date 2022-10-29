const express = require('express');
const router = express.Router();

const userModel = require("../../MongoDB/userModel");
const token = require("../../MongoDB/tokenModel");
// Get the id and the token from the url, and check if the token attached to the id matches with the token in the url.
router.get("/:id/verify/:token", async(req,res)=>{
    try{
        //fetching the user
        const user = await userModel.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        //getting the token from the url
        const urltoken = req.params.token;
        //fetching the token
        const decoded = await token.findOne({userId:user._id});
        if(!decoded){
            res.status(400).send({message:"Failed decoding",err});
            return;
        }
        //if not equal stop the process
        if(urltoken!==decoded.token){
            res.status(403).send({message:"Invalid Link"});
            return;
        } 
        //if all the requirements were met, update users verification state to true and delete the token
        const updateduser = await user.updateOne({_id:req.params._id,verified:true});
        let result = await decoded.deleteOne({userId:req.params.id});
        res.status(200).send({message:"Email verified sucessfully"});
        }
        catch(err){
            res.status(400).send({message:"Error has occured",err});
        }
})
module.exports = router;