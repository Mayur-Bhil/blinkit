import { Router } from "express";
import registerUserController, { userLoginController, verifyEmailController } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/register",registerUserController);
userRouter.post("/verify-email",verifyEmailController);
userRouter.post("/login",userLoginController);



export default userRouter;