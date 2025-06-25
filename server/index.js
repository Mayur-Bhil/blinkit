import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import { connectDB } from "./config/db.js"
const app =  express();

app.use(cors({
    credentials:true,
    origin:process.env.BASE_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const port = 8080 || process.env.port

app.get("/",(req,res)=>{
    res.json({
        message:"hi there"
    })
})

connectDB().then(()=>{

    app.listen(8080,( )=>{
    console.log(`server is running on port 8080`);
    console.log("Connected to DB successFully");
    })
}).catch((error)=>{
    console.log("connection error", error);
    
})
