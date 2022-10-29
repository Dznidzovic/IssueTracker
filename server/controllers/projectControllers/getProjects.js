const express = require('express');
const getAllProjects = require('../../services/projectServices/getAllProjects');
const router = express.Router();

//Fetch all the projects in the database
router.get("/get-projects", async(req,res)=>{
    try{
        const projects = await getAllProjects();
        if(!projects){
            return res.status(404).send({message:"Projects not found"});
        }
        res.status(200).send({message:"Projects successfully found",projects});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;