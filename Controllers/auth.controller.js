import bcryptjs from "bcryptjs";
import User from "../Models/User.model.js"; 
import jwt from 'jsonwebtoken' ; 
import { errorHandler } from "../utils/error.js";

 

 export const signUp = async(req, res, next)=>{
        

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json("User created Successfully!");
    } catch (error) {
      next(error) 
    }
   
   
 } 
 
 export const signIn = async(req , res, next)=>{
    const {email, password} = req.body ;  
    try{
        const validuser = await User.findOne({email}) ;
        if(!validuser){
            return next(errorHandler(404, "User not found"));
        } 
        const validPassword = bcryptjs.compareSync(password, validuser.password) 
        if(!validPassword){
            return next(errorHandler(404, "Wrong Credentials"))
        } 
        const token  = jwt.sign({id:validuser._id}, process.env.JWT_SECRET) 
        const {password:pass , ...rest}  = validuser._doc
        res.cookie('access_token', token , {httpOnly:true}).status(200).json({rest}) 
    }catch(error){
        next(error) ;
    }
 }  

  
 export const signOut = async(req, res, next)=>{
    try{  
        res.clearCookie('access_token') ; 
        res.status(200).json("User has been logout") ; 
    
      }catch(error){
        next(error) ; 
      }
 } 