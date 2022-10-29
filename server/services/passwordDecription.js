const bcrpyt = require('bcrypt');

const passwordDecription = async(req,res,user)=>{
    //decrypting the password and comparing them   
    const passwordCheck = await bcrpyt.compare(req.body.password,user.password)
    if(!passwordCheck){
        res.status(403).send({
            message:"Passwords do not match",
    })
    }
    return passwordCheck;
}
module.exports = passwordDecription;