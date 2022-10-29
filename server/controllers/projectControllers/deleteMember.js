const express = require('express');
const removeMember = require('../../services/projectServices/removeMember');
const router = express.Router();
//Request deletes one member(contributor) of the project found by currentProjectName in body section. Response returns updated contributors list to the client
router.delete("/delete-member", async(req,res)=>{
    try{
        const updatedProjectUsers = await removeMember(req,res);
        res.status(200).send({message:"Member deleted",updatedProjectUsers});

    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})
module.exports = router;