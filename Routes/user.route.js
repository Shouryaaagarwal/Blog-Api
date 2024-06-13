import express  from "express"; 
import { deleteUser, getUser, updateUser } from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router() ; 
 
 
 router.post("/update/:id",verifyToken,updateUser)  ; 
 router.delete("/deleteuser/:id",verifyToken,deleteUser) ; 
 router.get("/:id", verifyToken , getUser) ; 
 



export default router ; 