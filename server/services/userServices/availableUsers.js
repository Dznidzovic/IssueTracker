const userModel = require('../../MongoDB/userModel');
module.exports = async(req,res)=>{
    const availableUsers = [];
     const allUsers = await userModel.find({});
 
     if(!allUsers){
         return res.status(404).send({message:"Users not found!"});
     }
     //loop through both the array to find the differences between the 2 and add to the availableUsers array
     for(let i = 0;i<allUsers.length;i++){
         let state = false;
     
         for (let j = 0;j<req.body.currentUsers.length;j++){
          
 
             if(allUsers[i]._id.toString()===req.body.currentUsers[j][0]._id){
                 state=true;
             }
         }
         if(!state){
             availableUsers.push(allUsers[i]);
         }
 
         
     }
     return availableUsers;
}