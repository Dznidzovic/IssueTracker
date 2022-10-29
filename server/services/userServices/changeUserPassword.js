const bcrpyt = require('bcrypt');

const changeUserPassword = async(req,res,user)=>{
    //Hash the new password
    console.log(req.body.password);
    const hashedPassword = await bcrpyt.hash(req.body.password,10);
        console
    if(!hashedPassword){
        return;
    }
    //Update the password
    const changedPassword = await user.updateOne({_id:user._id,password:hashedPassword});
    if(!changedPassword){
        res.status(404).send({message:"User password not updated"});
    }
    return changedPassword;
}
module.exports = changeUserPassword;