const userModel = require("../../MongoDB/userModel");

module.exports = async(req,res)=>{

    const users = [];
    const contributors = req.body.contributors;

   
    for(let i = 0;i<contributors.length;i++){
        
       const firstName = contributors[i].split(" ")[0];
       const secondName = contributors[i].split(" ")[1];

       let user = await userModel.findOne({firstName:firstName,secondName:secondName});
 
       users.push([user]);
    }
    return users;
}