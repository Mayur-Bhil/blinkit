import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/user.route.js"
const app =  express();

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/user",userRouter);

connectDB().then(()=>{

    app.listen(port,( )=>{
    console.log(`server is running on port ${port}`);
    console.log("Connected to DB successFully");
    })
}).catch((error)=>{
    console.log("connection error", error);
    
})
