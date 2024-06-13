import User from "../Models/User.model.js";
import { errorHandler } from "../utils/error.js"; 
import bcryptjs from 'bcryptjs'

 
  export const getUser =async(req, res,next)=>{
    try{
        const user =await User.findById(req.params.id) ;   
        if(!user)return next(errorHandler(402 , "User not found")) ; 
        const {password:pass , ...rest} = user.toObject()  ;
        return res.status(200).json(rest) ; 
        }catch(error){ 

        next(error) ; 
    }
  } 
  export const deleteUser = async(req, res, next)=>{ 
    if(req.user.id!==req.params.id)return next(errorHandler(401,"User not found"))
    try{
       await User.findByIdAndDelete(req.params.id); 
        res.clearCookie("access_token") ;
 
        return res.status(200).json("User has been Deleted") ;
    } 
    catch(error){
        next(error) ; 
    }
  } 

  export const updateUser = async(req,res , next)=>{
    try{
        if (req.user.id !== req.params.id)
            return next(errorHandler(401, "You can only update your own account"));
          try {
            if (req.body.password) {
              req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }
            const updateuser = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: {
                  username: req.body.username,
                  email: req.body.email,
                  password: req.body.password,
                },
              },
              { new: true }
            ); 
        const {password , ...rest } = updateuser._doc; 
        res.status(200).json(rest)
        
          } catch (error) {
            next(error);
          }
        
         
    }
    catch(error){
        next(error) ; 
    }
  }
  