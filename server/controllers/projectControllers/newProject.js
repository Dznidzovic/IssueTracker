const express = require('express');
const addProject = require('../../services/projectServices/addProject');
const router = express.Router();

//Saving new project to the database
//Projects with the same name and desciption will not be saved with how we set projectModel
router.post("/new-project", async(req,res)=>{
    try{
       const project = await addProject(req,res);
       if(!project){
           return res.status(404).send({message:"Project could not be created"});
       }
       res.status(201).send({message:"Project Successfully Created"});
    }
    catch(err){
       res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;