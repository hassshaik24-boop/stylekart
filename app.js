const express=require("express");
const app=express();
const errorHandler=require("./backend/src/middlewares/errorHandler")
app.use(express.json());


app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});
//404 koi route match nahi hua
app.use((req,res,next)=>{
    const err=new Error(`Route not found${req.originalUrl}`);
    err.statusCode=404;
    next(err);
})
app.use(errorHandler);
module.exports=app;