const token = require('../../MongoDB/tokenModel');

const verifyToken = async(req,res)=>{

     //Get token from the url in the mail
     const urlToken = req.params.token;
   
     //Find the token in the database with the token from the url
     const Token = await token.findOne({token:urlToken});
      
     //If they don't match, return 400 response and stop the password reset process
     if(!Token){
        res.status(404).send({message:"Tokens don't match"});
     }
     return Token;
}
module.exports = verifyToken;