import sendEmail from "../config/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import verificatioEmailTemplate from "../utils/verifyEmailTEmplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefressToken.js";
import uploadImageCloudinary from "../utils/uploadImagesToCloudinary.js";



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
//logout Controller
export async function logOutController(req,res){
    try {
        const userId = req.userId;
         const cookieOptions = {
            httponly:true,  
            secure:true,
            sameSite:"None"
        }
        res.clearCookie("accessToken",cookieOptions);
        res.clearCookie("refreshToken",cookieOptions);

        const removeRefreshToken = await User.findByIdAndUpdate(userId,{
            refresh_token : ""
        })

        return res.status(200).json({
            message:"Logout SuccessFully",
            error:"false",
            success:true
        })
    } catch (error) {
        return res.status(500).josn({
            error:error,
            success:false,
            error:true
        })
    }
}

//upload user image
export async function uploadAvtar(req,res) {
        try {

            const userId = req.userId // auth MiddleWare
            const image = req.file; // multer Middlware

            const upload = await uploadImageCloudinary(image);
            console.log(upload);
            

            const updateUser = await User.findByIdAndUpdate(userId,{
                avatar:upload.url
            })
            return res.status(200).json({
                message:"Upload Profile",
                data :{
                    _id : userId ,
                    avatar : upload.url
                }
            })
        } catch (error) {
            return res.status(500).json({
                message:error.message || error,
                error:error,
                success:true 
            })
        }
}

export async function UpdateUserprofileInformation(req,res){
    try {
        const userId = req.userId; // auth middleware
        const { name,email,mobile,password } = req.body;
        console.log(name,email,password,mobile);
        

        let hasedPassword = "";
        if(password){
            const salt = await bcrypt.genSalt(10);
            hasedPassword = await bcrypt.hash(password,salt);
        }
        const updateuser = await User.updateOne({_id:userId},{
                ...(name && {name:name}),
                ...(email && {email:email}),
                ...(mobile && {moblie:mobile}),
                ...(password && {password:hasedPassword})
            })  
           
         return res.json({
            message :"Updated User profile successFully",
            data : updateuser
         })
            
    } catch (error) {
         return res.json({
            message:error.message || error,
            error:true,
            success:false
         })
    }
}