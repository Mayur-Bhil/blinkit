import { Router } from "express";
import auth from "../middlewares/auth.js";  
import { adddressCOntroller, getaddressController } from "../controllers/Address.controller.js";  

const addressRouter = Router();


addressRouter.post("/create", auth, adddressCOntroller);
addressRouter.get("/get",auth,getaddressController);

export default addressRouter;