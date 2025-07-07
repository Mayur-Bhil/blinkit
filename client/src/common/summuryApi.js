export const BASE_URL = "http://localhost:8080"
const summeryApis = {
    register:{
        url:'/api/user/register',
        method:'POST'
    },
    login:{
        url:'/api/user/login',
        method:'POST'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:"POST"
    },
    verify_Otp:{
        url:'/api/user/verify-otp',
        method:"PUT"
    },
    reset_password:{
        url:'/api/user/reset-password',
        method:"PUT"
        
    },
    referesh_Token:{
        url:"/api/user/refresh-token",
        method:"POST"
    },
    userDetails:{
        url:"/api/user/user-details",
        method:"GET"
    },
    logout:{
        url:"/api/user/logout",
        method:"GET"
    },
    UploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"PUT"
    }
}

export default summeryApis;