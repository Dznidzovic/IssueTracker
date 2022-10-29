const tokenModel = require('../../MongoDB/tokenModel');
const crypto = require("crypto");


const createToken = async(user)=>{
    //Create a new Token
    const Token = await new tokenModel({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex")
    }).save();
    return Token;
}
module.exports = createToken;