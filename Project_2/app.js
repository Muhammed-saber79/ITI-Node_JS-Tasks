const { response } = require("express");
const express=require("express");
const server=express();
const cors=require("cors");
const morgan=require("morgan");

let port=process.env.PORT||8080;

server.listen(port,()=>{
    console.log("Server is Listening...");
});

server.use(morgan("combined"));
server.use(cors());
server.use((request,response,next)=>{
    if(!request.route){
        return next(new Error("error...!"));
    }
    next();
})
/************ End Of Cors Middleware ***********/


server.use((request,response,next)=>{
    response.status(404).json({message:"Page Not Found...!"});
})
/************ End Of Not Found Middleware ***********/

server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
})
/************ End Of Error Middleware ***********/