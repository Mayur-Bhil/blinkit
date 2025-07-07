import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMobileMenupage from "../pages/UserMobileMenupage";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/Myorders";
import Address from "../pages/Address";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },{
                path:"search",
                element:<SearchPage/>
            },{
                path:"login",
                element :<Login/>
            },{
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },{
                path:"verify-otp",
                element:<OtpVerification/>
            },{
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"user",
                element:<UserMobileMenupage/>
            },{
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },{
                        path:"myorders",
                        element:<MyOrders/>
                    },
                    {
                        path:"address",
                        element:<Address/>
                    }
                ]
            }
        ]
    }
])


export default router;