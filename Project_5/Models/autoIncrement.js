const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    _id:Number
})

mongoose.model("ai",schema);