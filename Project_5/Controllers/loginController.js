const mongoose=require("mongoose");
const schema=require("./../Models/teacherModel");
const Teacher=mongoose.model("teachers");
const jwt=require("jsonwebtoken");

exports.login=((request,response,next)=>{
    Teacher.findOne({email:request.body.email,password:request.body.password})
    .then((data)=>{
        if(data==null){
            let error=new Error("u are not authenticated...!");
            error.status=401;
            next(error);
        }else{
            if(data.role=="Admin"){
                let token=jwt.sign(
                        {id:data._id,role:"Admin"},
                        "OSMans",
                        {expiresIn:"2h"}
                    );
                response.status(200).json({data:"Authenticated",token});
            }else{
                let token=jwt.sign(
                    {id:data._id,role:"employee"},
                    "OSMans",
                    {expiresIn:"2h"}
                );
                response.status(200).json({data:"Authenticated",token});
            }
        }
    })
    .catch(error=>{
        next(error);
    })
})