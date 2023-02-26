const mongoose=require("mongoose");
const schema=require("./../Models/classModel");
const Class=mongoose.model("class");
const Teacher=mongoose.model("teachers");
const Children=mongoose.model("children");

const aiSchema=require("./../Models/autoIncrement");
const AutoInc=mongoose.model("ai");

exports.getAllClasses=(request,response)=>{
    Class.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    })
}

exports.getClass=(request,response)=>{
    Class.findOne({_id:request.body._id})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    })
}

/************* Auto Increment Function ************/
function increase(){
    let count=Class.count();
    AutoInc.updateOne({},{$inc:{_id:1}},{});

    let nextId=AutoInc.findOne({},{_id});
    return nextId;
}

exports.addClass=async(request,response,next)=>{
    try{
        let teacher=await Teacher.findOne({_id:request.body.supervisor},{_id:1});
        if(teacher==null){
            throw new Error("No such teacher id exists...!");
        }

        for(let id in request.body.children){
            let children=await Children.findOne({_id:request.body.children[id]});
            if(children==null){
                throw new Error(request.body.children[id]+" no such id exists for child...!");
            }
        }

        let data=await new Class({
            _id:request.body._id,
            name:request.body.name,
            superVisor:request.body.supervisor,
            children:request.body.children
        }).save()
        response.status(201).json({data:"added successfully."});
        // console.log(increase());
    }catch(error){
        next(error);
    }
}


exports.updateClass=async(request,response,next)=>{
    
    try{
        if(request.body.children != null || request.body.supervisor != null){
            let teacher=await Teacher.findOne({_id:request.body.supervisor},{_id:1});
            if(teacher==null){
                throw new Error("No such teacher id exists...!");
            }
    
            for(let id in request.body.children){
                let children=await Children.findOne({_id:request.body.children[id]});
                if(children==null){
                    throw new Error(request.body.children[id]+" no such id exists for child...!");
                }
            }
        }
    
        Class.updateOne(
            {_id:request.body._id},
            {
                name:request.body.name,
                superVisor:request.body.supervisor,
                children:request.body.children
            }
        )
        .then((data)=>{
            response.status(200).json({data:"updated successfully."});
        })
        .catch(error=>{
            next(error);
        })
    }catch(error){
        next(error);
    }
}


exports.deleteClass=(request,response,next)=>{
    Class.findOne({_id:request.body._id})
    .then((data)=>{
        if(data==null){
            next(new Error("no such class exists...!"));
        }else{
            return Class.deleteOne({_id:request.body._id});
        }
    })
    .then(()=>{
        response.status(200).json({data:"deleted successfully."});
    })
    .catch(error=>{
        next(error);
    })
}
