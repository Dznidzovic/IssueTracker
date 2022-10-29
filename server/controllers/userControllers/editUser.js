const express = require('express');
const router = express.Router();
const changeUser = require('../../services/userServices/changeUser');

router.put("/edit-user", async(req,res)=>{
    try{

        const allusers = await changeUser(req,res);
        if(!allusers){
            return res.status(404).send({message:"User not edited"});
        }
        res.status(201).send({message:"Users Found",allusers})
    }
    catch(err){
        res.status(404).send({message:"Error has occured",err});
    }
})
module.exports = router;