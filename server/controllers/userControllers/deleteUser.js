const express = require('express');
const router = express.Router();
const removeUser = require('../../services/userServices/removeUser');

router.delete("/delete-user", async(req,res)=>{
    try{
       const allusers = await removeUser(req,res);
       if(!allusers){
        return res.status(404).send({message:"User not deleted properly"});
       }
       return res.status(200).send({message:"User successfully deleted",allusers});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
    
})
module.exports = router;