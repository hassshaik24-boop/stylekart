const mongoose=require("mongoose");
async function connectDB(){
    try{
await mongoose.connect(process.env.MONGO_URI)
console.log("mongodb is connected ");
    }catch(err){
console.log(`error in mongodb ${err}`);
process.exit(1);
    }
}

module.exports=connectDB;