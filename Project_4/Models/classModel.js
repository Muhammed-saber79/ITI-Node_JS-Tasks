const mongoose=require("mongoose");
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const schema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},
    superVisor:{type:ObjectId,ref:"teachers"},
    children:{
        type:[Number],
        ref:"children"
    }
})

mongoose.model("class",schema);