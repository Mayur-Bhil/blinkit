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
    }
}

export default summeryApis;