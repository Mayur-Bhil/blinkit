import{ Router } from "express";
import auth from "../middlewares/auth.js";
import { addtoCartController } from "../controllers/cart.controller.js";
const cartRouter = Router();


cartRouter.post("/create",auth,addtoCartController)
export default cartRouter;