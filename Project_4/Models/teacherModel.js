const mongoose=require("mongoose");
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const schema=new mongoose.Schema({
    _id:ObjectId,
    fullName:{type:String,required:true},
    password:{type:String,reuired:true},
    email:{type:String,required:true},
    image:String
})

mongoose.model("teachers",schema);