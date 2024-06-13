import express from 'express'  
import { create, createBlog, deleteBlog, getBlog, updateBlog ,getBlogsByUser, getBlogs } from '../Controllers/blog.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
 

const router  = express.Router() ; 
 

router.get("/test",create) ;   
router.post("/createBlog",verifyToken,createBlog) ;  
router.post("/updateblog/:id",verifyToken,updateBlog) ; 
router.get("/get/:id", getBlog) ;  
router.get("/get", getBlogs)
router.get("/get/userBlogs/:id",verifyToken,getBlogsByUser);   
router.delete("/deleteBlog/:id",verifyToken ,deleteBlog) ; 






export default router  ; 