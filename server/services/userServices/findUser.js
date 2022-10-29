const userModel = require("../../MongoDB/userModel");

const findUser = async(req,res)=>{
    if(req.body.email){
        //Searching for the user with the given email
        var user = await userModel.findOne({email:req.body.email})
        //if not found stop the function
        if(!user){
             res.status(404).send({
                message:"User not found",
        })
        }
    }
    else if(req.body.id){
      
         //Searching for the user with the given id(Some requests search by id and some by mail)
         var user = await userModel.findOne({_id:req.body.id});
         //if not found stop the function
         if(!user){
              res.status(404).send({
                 message:"User not found",
         })
         }
    }

    
     return user;   
         
}
module.exports = findUser;