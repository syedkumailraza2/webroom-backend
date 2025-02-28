import {Router} from "express"
import protect from "../middleware/auth.middleware.js"
import { register,loginStudent, updateStudentProfile } from "../controller/student.controller.js"
import { upload } from "../middleware/multer.middleware.js"
const path = Router()

path.post('/register',register)
