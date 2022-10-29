
const express = require('express');
const findComment = require('../../services/commentServices/findComment');
const getAllProjects = require('../../services/projectServices/getAllProjects');
const getProject = require('../../services/projectServices/getProject');
const findTickets = require('../../services/ticketServices/findTickets');
const projectDelete = require("../../services/projectServices/projectDelete");
const router = express.Router();

//Request deletes the project based on project id. All the tickects and comments attached to the project get deleted aswell
router.delete("/delete-project", async(req,res)=>{
    try{   
        const projectToDelete = await getProject(req,res);
        if(!projectToDelete){
            return res.status(404).send({message:"Project not found"});
         }
        const deleteProject = await projectDelete(projectToDelete);
        if(!deleteProject){
           return res.status(404).send({message:"Project not deleted"});
        }
        const tickets = await findTickets(deleteProject.projectName);
        if(!tickets){
            return res.status(404).send({message:"Tickets not found"});
        }
        for(let i = 0;i<tickets.length;i++){
            const deleteTicket = tickets[i].delete();
        }
        req.body.currentProjectName = deleteProject.projectName;
        const comments = await findComment(req,res);
        if(!comments){
            return res.status(404).send({message:"Tickets not found"});
        }
       
        for(let i = 0;i<comments.length;i++){
            const deletedComment = comments[i].delete();
        }
        const newProjects = await getAllProjects();
        if(!newProjects){
            return res.status(404).send({message:"Projects not found"});
        }
        res.status(200).send({message:"Project Deleted",newProjects});
    }
    catch(err){
        res.status(400).send({message:"Error has occured",err});
    }
})

module.exports = router;