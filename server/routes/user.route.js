import { Router } from "express";
import registerUserController, { logOutController, userLoginController, verifyEmailController } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
const userRouter = Router();

userRouter.post("/register",registerUserController);
userRouter.post("/verify-email",verifyEmailController);
userRouter.post("/login",userLoginController);
userRouter.get("/logout",auth,logOutController);


export default userRouter;