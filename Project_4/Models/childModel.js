const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    _id:Number,
    fullName:{type:String,required:true},
    age:Number,
    level:{
        type:String,
        enum:['PreKG','KG1','KG2'],
        required:true
    },
    address:{
        city:{type:String,required:true},
        street:{type:String,required:true},
        building:{type:String,required:true}
    }
})

mongoose.model("children",schema);