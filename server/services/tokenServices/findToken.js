


const tokenModel = require('../../MongoDB/tokenModel');

const findToken = async(req,res,user)=>{
    try{
       if(req.body.token){
        var foundtoken = await tokenModel.findOne({token:req.body.token});
        if(!foundtoken){
            res.status(404).send({message:"Token not found"});
        }
       }
       else if(user){
            var foundtoken = await tokenModel.findOne({userId:user._id});
            if(!foundtoken){
                res.status(404).send({message:"Token not found"});
            }
       }
    
   
    return foundtoken;
    }
    catch(err){
        res.status(400).send({message:"Error has occurd"});
    }
}
module.exports = findToken;