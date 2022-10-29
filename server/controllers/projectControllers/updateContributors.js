const express = require('express');
const updateProjectContributors = require('../../services/projectServices/updateProjectContributors');
const router = express.Router();
//Update the project contributors, then loop through the contributors and find every user linked to those names, then send the users so they can be displayed
//Maximum 5 developers are allowed;
router.put("/update-contributors", async(req,res)=>{
    try{
        const returnUpdatedUsers = await updateProjectContributors(req,res);
        res.status(200).send({message:"Project Updated",returnUpdatedUsers});
       
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})
module.exports = router;