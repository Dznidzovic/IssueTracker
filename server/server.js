const express = require("express");
const cors = require("cors");
const connect = require("./MongoDB/dbConnect");
const app = express();
const routes  = require("./routes/routes");
const body_parser = require('body-parser');

//Connecting mongodb to the app
connect()
//Running a server at port 4000
const port = process.env.PORT || 4000;
app.listen( port,()=>{
    console.log("Server is running on port 4000");
});

//Allowing Cross Origin Resource Sharing
app.use(cors({origin:true, credentials:true}));
//Allows us to access data of the incoming request as the body of the request
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
//connecting all the routes
app.use(routes);
