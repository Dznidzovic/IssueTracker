const userModel = require("../../MongoDB/userModel");
const bcrpyt = require('bcrypt');

const addUser = async(req)=>{
    const {firstName,secondName,phoneNumber,email,password} = req.body
    //Hashing the password, therefore increasing security
    const hashedPassword = await bcrpyt.hash(password,10);
    if(!hashedPassword){
        return res.status(404).send({message:"Password not hashed"});
    }
    //Saving the user
    const user = await new userModel({
        firstName:firstName,
        secondName:secondName,
        phoneNumber:phoneNumber,
        email:email,
        password:hashedPassword
    }).save();
    return user;

}
module.exports = addUser