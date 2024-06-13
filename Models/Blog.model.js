import mongoose, { startSession } from "mongoose"; 


const BlogSchema = new mongoose.Schema({
            name :{
                type:String , 
                required:true,
                
            },
            date:{
                type:String , 
                required:true , 
            },
           title:{    
                type:String , 
                required:true,
            } , 
 
            content:{
                    type:String , 
                    required:true,
            } ,
            userref:{
                type:String, 
                required:true , 
            }
}) 

const Blog = mongoose.model("Blog" , BlogSchema); 
export default Blog ; 