const projectModel = require('../../MongoDB/projectModel');

module.exports = async()=>{
   
    const projects = await projectModel.find({});

    return projects;    

}