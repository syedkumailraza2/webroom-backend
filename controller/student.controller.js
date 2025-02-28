import Student from "../Model/student.model.js"
import jwt from "jsonwebtoken"

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:'30d'
    })
   }
   
const register = async (req,res)=>{
    try {
        const { name, email, prn_no, phone_no, course, year, designation, skills, password } = req.body;
        if (!name || !email || !prn_no || !password) {
          throw res.status(400)
                    .json({
                         message: 'Please fill all required fields' 
                        });
        }
    
        const existingStudent = await Student.findOne({ 
            $or: [
                { email },
                 { prn_no }
            ] 
        });
        if (existingStudent) {
          throw res.status(400)
                    .json({ 
            message: 'Email or PRN No already registered!' 
        });
        }
        
        const student = await Student.create({
        name,
          email,
          prn_no,
          phone_no,
          course,
          year,
          designation,
          skills,
          password
        })
          
     return res.status(201).json({
             message: 'Student registered successfully' ,
             student,
             token:generateToken(student._id)
            });
    } catch (error) {
        res.status(500)
        .json({
            message:error.message
        })
    }
}

export {
    register
}