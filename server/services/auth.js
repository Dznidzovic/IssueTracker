const jwt = require("jsonwebtoken");

module.exports = async(request,response,next)=>{
    try{
        //get the token from authorization header
        const token = await request.headers.authorization.split(" ")[1];
        //check if the token matches the supposed origin
        const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        //get the details of logged in user
        const user =  decodedToken;
        request.user = user;
        response.send(user);
        //pass the functionality to the next endpoint
        next();
    }
    catch{
        response.status(401).json({
            error: new Error("Invalid request")
        })
    }
}