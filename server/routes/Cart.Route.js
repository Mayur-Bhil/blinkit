import{ Router } from "express";
import auth from "../middlewares/auth.js";
import { addtoCartController, getCartItem } from "../controllers/cart.controller.js";
const cartRouter = Router();


cartRouter.post("/create",auth,addtoCartController);
cartRouter.get("/get",auth,getCartItem)
export default cartRouter;