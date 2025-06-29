import { Router } from "express";
import registerUserController, { logOutController, UpdateUserprofileInformation, uploadAvtar, userLoginController, verifyEmailController } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
const userRouter = Router();

userRouter.post("/register",registerUserController);
userRouter.post("/verify-email",verifyEmailController);
userRouter.post("/login",userLoginController);
userRouter.get("/logout",auth,logOutController);
userRouter.put("/upload-avatar",auth,upload.single('avatar'),uploadAvtar);
userRouter.put("/update-user",auth,UpdateUserprofileInformation);


export default userRouter;