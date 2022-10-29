const express = require('express');
const getProject = require('../../services/projectServices/getProject');

const router = express.Router();


router.post('/get-project',async(req,res)=>{
    const project = await getProject(req,res);

    if(!project){
        return res.status(404).send({message:"Project not found"});
    }
    res.status(200).send({message:"Project found",project});
})

module.exports = router;