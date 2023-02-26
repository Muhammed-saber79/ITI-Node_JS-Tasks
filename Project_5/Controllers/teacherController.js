const mongoose=require("mongoose");
const schema=require("./../Models/teacherModel");
const Teacher=mongoose.model("teachers");

exports.getAllTeachers=(request,response,next)=>{
    Teacher.find()
    .then((data)=>{
        if(data==null){
            next(new Error("no data exists...!"));
        }else{
            response.status(200).json({data});
        }
    })
    .catch(error=>{
        next(error);
    })
}

exports.getTeacher=(request,response,next)=>{
    Teacher.findOne({_id:request.params.id})
    .then((data)=>{
        if(data==null){
            next(new Error("no such data exists...!"));
        }else{
            response.status(200).json({data});
        }
    })
    .catch(error=>{
        next(error);
    })
}

exports.addTeacher=async(request,response,next)=>{
    try{
        let data=await new Teacher({
            _id:request.body._id,
            fullName:request.body.fullName,
            password:request.body.password,
            email:request.body.email,
            image:request.body.image,
            role:request.body.role
        }).save();
        response.status(201).json({data:"added successfully."});
    }catch(error){
        next(error);
    }         
}

exports.updateTeacher=(request,response,next)=>{
    Teacher.updateOne(
        {_id:request.body._id},
        {
            fullName:request.body.fullName,
            password:request.body.password,
            email:request.body.email,
            image:request.file.originalName,
            role:request.body.role
        }
    )
    .then((data)=>{
        if(data.matchedCount==0){
            next(new Error("No such teacher exists...!"));
        }else{
            response.status(200).json({data:"updated successfully."});
        }
    })
    .catch(error=>{
        next(error);
    });
}

exports.deleteTeacher=(request,response,next)=>{
    Teacher.findOne({_id:request.body._id})
    .then((data)=>{
        if(data==null){
            next(new Error("no such teacher exists...!"));
        }else{
            return Teacher.deleteOne({_id:request.body._id})
        }
    })
    .then(()=>{
        response.status(200).json({data:"deleted successfully."});
    })
    .catch(error=>{
        next(error);
    })
}

