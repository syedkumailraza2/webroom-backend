import express from "express"
import cors from 'cors'
import connectDB from "./config/db.js"
import dotenv from "dotenv";
import router from "./routes/studymaterial.route.js";
import projectRoutes from "./Routes/project.routes.js"
import path from "./routes/student.routes.js"
dotenv.config();

const PORT = process.env.PORT || 8000

const app = express()
app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.use("/notes", router);
app.use("/projects", projectRoutes);


//Student Routes
app.use("/student",path)
connectDB()

app.listen(PORT,()=>{
    console.log(`Server runing on http://localhost:${PORT}`);
    
})