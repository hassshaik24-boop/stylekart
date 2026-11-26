const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]//email ko iske throgh validate karna
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password atleast shoulb 8 characters"],
        select:false  //const user = await User.findOne({ email }).select("+password");
    },
    role:{
        type:String,
        enum:["user","admin"],default:"user",
    }},{timestamps:true});

    const User=mongoose.model("User",userSchema);
    module.exports=User;