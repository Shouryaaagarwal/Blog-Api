import express from 'express' ;  
import dotenv from 'dotenv';  
import mongoose from 'mongoose';
import blogRouter from './Routes/blog.route.js' 
import userRouter from './Routes/user.route.js' 
import authRouter from './Routes/auth.route.js' 
import cookieParser from 'cookie-parser';
 dotenv.config() ; 



const app = express() ;   

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to database") ; 
}) 
.catch((error)=>{
    console.log(error) ; 
})  


app.use(express.json()) ;  
app.use(cookieParser()) ;  
app.use("/api/user",userRouter) ;
app.use("/api/blog",blogRouter) ; 
app.use("/api/auth",authRouter) ; 
app.use((err, req , res , next )=>{
    const statusCode = err.statusCode||500  ;
    const message  = err.message||'Internal Message Error' ;
    return  res.status(statusCode).json({
      success:false  , 
      message ,
      statusCode
    })
  }) 
 

// shourya0864
// EF8sgmVN6Nz2EIjS

app.listen(3000,()=>{
    console.log('server is running') ;
})