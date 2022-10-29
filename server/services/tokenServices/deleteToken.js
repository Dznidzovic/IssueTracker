

const deleteToken = async (req,res,token,user)=>{
    const deletedToken = await token.deleteOne({userId:user._id}); 
    if(!deletedToken){
        res.status(404).send({message:"Token not deleted"});
    }
    return deletedToken;
}
module.exports = deleteToken;
