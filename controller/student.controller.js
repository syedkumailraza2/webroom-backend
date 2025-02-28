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


const loginStudent = async(req,res)=>{
    try {
        const {prn_no ,password} = req.body
        if(!prn_no || !password){
         throw  res.status(401)
            .json({
                message:'PRN and password is required!'
            })
        }
         const student = await Student.findOne({prn_no})
         if(!student){
            throw res.status(401)
            .json({
                message:'Student is invalid!'
            })
        }
        const IsValidPassword= await student.matchPassword(password)
        if(!IsValidPassword){
            throw res.status(401)
            .json({
                message:'Incorrect password!'
            })
        }
        return res.status(200)
        .json({
            message:"Login Sucessfully",
            name:student.name,
            email:student.email,
            token:generateToken(student._id)
        })

    } catch (error) {
        res.status(500)
        .json({
            message:error.message
        })
    }
}

const updateStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update other details
        Object.keys(updates).forEach((key) => {
            student[key] = updates[key];
        });

        // If image is uploaded, update profile image
        if (req.file) {
            student.image = req.file.buffer.toString("base64");
        }

        const updatedStudent = await student.save();

        res.status(200).json({
            message: "Student profile updated successfully",
            updatedStudent
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    register,
    loginStudent,
    updateStudentProfile
}