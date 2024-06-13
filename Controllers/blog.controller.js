import Blog from "../Models/Blog.model.js";
import { errorHandler } from "../utils/error.js";

export const create =(req, res)=>{
res.send("Hello"); 
} 

export const createBlog =async (req, res , next)=>{ 
    try{
        const createBlogs  =await Blog.create(req.body) ; 
        return res.status(200).json(createBlogs)  ; 
    } 
    catch(error){
       next(error) ;  
     }
        
}     

export const deleteBlog = async(req, res, next)=>{  
    const blog = await Blog.findById(req.params.id)  ; 
    if(!blog) return next(errorHandler(404,"Blog not found")) ;   
    if(req.user.id!==blog.userref){
        return next(errorHandler(403, "You are not allowed to delete this blog")) ;
    }
    try{ 
         await Blog.findByIdAndDelete(req.params.id) ;  
         return res.status(200).json('Blog has been deleted') ;
    }catch(error){
        next(error) ; 
    }

}
 
 export const updateBlog = async(req, res, next)=>{ 
  const blog = await Blog.findById(req.params.id) ; 
  if(!blog)return next(errorHandler(404,"Blog not found")) ; 
   
  if(req.user.id!==blog.userref)return next(errorHandler(400, "You cannot update this blog")) ; 
   try{
    await Blog.findByIdAndUpdate(req.params.id, req.body , {
new:true,
    })  ; 
    res.status(200).json(blog) ; 

   }  catch(error){
    next(error) ; 
   }

 } 
  
  export const getBlog = async(req, res ,next)=>{
    try{
        const blog = await Blog.findById(req.params.id) ; 
        if(!blog) return next(errorHandler(404,"Blog not found")) ; 
        return res.status(200).json(blog) ; 
    }catch(error){
        next(error) ; 
    }
  } 
   

  export const getBlogsByUser = async (req, res, next) => {
    try {
        const id= req.params.id; 
        const blogs = await Blog.find({ userref: id });
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
}; 
  
  export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};