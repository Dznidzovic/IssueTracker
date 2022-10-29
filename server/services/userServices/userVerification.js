const token = require("../../MongoDB/tokenModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../emailServices/SendEmail");
const crypto = require("crypto");


const userVerification = async(req,res,user)=>{
     //if user is not verified, delete the current token tied to the user, send another verification email
     if(!user.verified){
        //deleting the token
        await token.deleteOne({userId:user._id});
        //Creating a new one
        const Token = await new token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save();
        //Sending another email
        await sendEmail(req,res,user,Token.token);
        return res.status(403).send({message:"User not verified, verification link has been sent."});
    
        
    
    }
    else{
        
    //If all the requirements were met, create accessToken for authorization and send it to the client
    
    const accessToken = jwt.sign({
        userId: user._id,
        email: user.email,
        admin:user.admin,
        firstName:user.firstName,
        secondName:user.secondName
    },
    process.env.ACCESS_TOKEN_SECRET,
    ) 

    res.status(200).send({
        message:"Login was successful",
        email: user.email,
        accessToken
    })
    }
}
module.exports = userVerification;