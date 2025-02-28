import express from "express"
import cors from 'cors'
import connectDB from "./config/db.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000

const app = express()
app.get('/', (req,res)=>{
    res.send('Hello World!')
})

connectDB()

app.listen(PORT,()=>{
    console.log(`Server runing on http://localhost:${PORT}`);
    
})