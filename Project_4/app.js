const express=require("express");
const cors=require("cors");
const server=express();
const mongoose=require("mongoose");
const teacherRoute=require("./Routes/teacherRoutes");
const childRoute=require("./Routes/childRoutes");
const classRoute=require("./Routes/classRoutes");
const port=process.env.PORT||8080;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/NEWDB")
    .then(()=>{
        console.log("DB Connected...");
        server.listen(port,()=>{
            console.log("Server is Listening...");
        });
    })
    .catch(error=>{
        console.log("Cannot Connect DB: "+error);
    });



server.use(cors());
server.use((request,response,next)=>{
    if(!true){
        return next(new Error("server error...!"));
    }
    next();
})
/************ End Of Cors Middleware ***********/


server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
/************ End Of Register Routes ***********/


server.use((request,response,next)=>{
    response.status(404).json({message:"Page Not Found...!"});
})
/************ End Of Not Found Middleware ***********/


server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
})
/************ End Of Error Middleware ***********/
