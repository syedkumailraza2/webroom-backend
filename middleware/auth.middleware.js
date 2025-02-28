import jwt, { decode } from "jsonwebtoken"
import Student from "../Model/student.model.js"


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await Student.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
                .json({
                    message: "Not authorized Token failed!"
                })
        }
    }
    if (!token) {
         res.status(401)
            .json({
                message: "Not authorization no token provided!"
            })
    }
}


export default protect