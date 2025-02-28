import {Router} from "express"
import  protect  from "../middleware/auth.middleware.js"; 
import { register,loginUser, updateStudentProfile,getStudentProfile,deleteStudentByAdmin,sendConnectionRequest,handleConnectionRequest } from "../controller/student.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import isAdmin from "../middleware/isadmin.middleware.js";
const path = Router()

path.post('/register',register)

path.post('/login',loginUser)
path.put('/update/:id',protect,upload.single("image"),updateStudentProfile)

path.get("/profile", protect, getStudentProfile)

path.delete('/admin/:id',protect,isAdmin,deleteStudentByAdmin)

// Connection Routes
path.post('/sendrequest', protect, sendConnectionRequest);
path.post('/handlerequest', protect,handleConnectionRequest);


export default path