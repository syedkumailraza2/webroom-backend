import {Router} from "express"
import protect from "../middleware/auth.middleware.js"
import { register } from "../controller/student.controller.js"
const path = Router()

path.post('/register',register)
