const mongoose=require("mongoose");
const schema=require("./../Models/childModel");
const Children=mongoose.model("children");

exports.getAllChilds=(request,response,next)=>{
    Children.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    })
}

exports.getChild=(request,response,next)=>{
    Children.findOne({_id:request.params.id})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    });
}

exports.addChild=async(request,response,next)=>{
    try{
        let data=await new Children({
            _id:request.body._id,
            fullName:request.body.fullName,
            age:request.body.age,
            level:request.body.level,
            address:request.body.address
        }).save()
        response.status(201).json({data});
    }catch(error){
        next(error);
    }
}

exports.updateChild=(request,response,next)=>{
    Children.updateOne(
        {
            _id:request.body._id
        },
        {
            $set:{
                fullName:request.body.fullName,
                age:request.body.age,
                level:request.body.level,
                address:request.body.address
            }
        })
        .then((data)=>{
            if(data.matchedCount==0){
                next(new Error("Child Not Found...!"));
            }else{
                response.status(200).json({data:"updated successfully."});
            }
        })
        .catch(error=>{
            next(error);
        });
}

exports.deleteChild=(request,response,next)=>{
    Children.findOne({_id:request.body})
    .then((data)=>{
        if(data==null){
            next(new Error("no such child exists...!"));
        }else{
            return Children.deleteOne({_id:request.body._id});
        }
    })
    .then(()=>{
        response.status(200).json({data:"deleted successfully."});
    })
    .catch(error=>{next(error)})
}