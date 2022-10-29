const userModel = require('../../MongoDB/userModel');

const findEmail = async(req,res)=>{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
         res.status(404).send({message:"User not found"});
    }
    return user;
}
module.exports = findEmail;