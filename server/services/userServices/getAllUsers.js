
const userModel = require('../../MongoDB/userModel');

module.exports = async()=>{
    const users = userModel.find({});
    return users;
}