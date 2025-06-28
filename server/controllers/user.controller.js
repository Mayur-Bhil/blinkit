import sendEmail from "../config/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import verificatioEmailTemplate from "../utils/verifyEmailTEmplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefressToken.js";

export default async function registerUserController(req,res) {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            res.status(400).josn({
                message:"provide email,name,password",
                error:true,
                success:false
            })
        }

        const user = await User.findOne({email:email})
        if(user){
            return res.send({
                message:"already registerd user",
                error: true,
                success: false
            })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt);

        const payload = {
            name,
            email,
            password:hasedPassword
        }

        const newUser = new User(payload);
        const save = await newUser.save();

        const  verifyEmailUrl = `${process.env.BASE_URL}/verify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo:email,
            subject:"verification Email for your Account",
            html:verificatioEmailTemplate({
                name,
                url:verifyEmailUrl
                
            })
        })
      

        return res.json({
            message:"User registerd successFully",
            error:false,
            success:true,
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error: true,
            success:false
        })
    }
}


export async function verifyEmailController(req,res){
    try {
        const { code } = req.body;
        
        const user = await  User.findOne({_id:code})

        if(!user){
               return res.status(400).josn({
                   message:"Invalid Code",
                   error : true,
                   
               })
        }
        const updateUser = await User.updateOne({_id:code},{
            verify_email:true
        })

        return res.json({
            message: "Email verified",
            success:true,
            error:false
        })
    } catch (error) {
        return res.status(500).josn({
            message:error,
            error:true,
            success:true
        })    
    }
}

//login controller

export async function userLoginController(req,res){
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).josn({
                message:"please provide email and password",
                error:true, 
                success:false
            })
        }
        const user = await User.findOne({email:email});

        if(!user){
            res.status(400).json({
                message: "user not registered",
                error:true,
                success:false
            })
        }
        if(user.status !== "active"){
            return res.status(400).json({
                message: "contact to admin",
                error:true,
                success:false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).josn({
                message:"check your password",
                error:true,
                success:false
            })
        }
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        const cookieOptions = {
            httponly:true,  
            secure:true,
            sameSite:"None"
        }
        res.cookie('accessToken',accessToken,cookieOptions);
        res.cookie('refressToken',refreshToken,cookieOptions);
        return res.send({
            message :"Login SuccessFully",
            error:false,
            success:true,
            data : {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export async function logOutController(req,res){
    try {
        
    } catch (error) {
        return res.status(500).josn({
            error:error,
            success:false,
            error:true
        })
    }
}