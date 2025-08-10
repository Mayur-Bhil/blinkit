import{ Router } from "express";
import auth from "../middlewares/auth.js";
import { addtoCartController, getCartItemsController, updateCartItemQtyCOntroller } from "../controllers/cart.controller.js";
const cartRouter = Router();


cartRouter.post("/create",auth,addtoCartController);
cartRouter.get("/get",auth,getCartItemsController);
cartRouter.put("/update-qty",auth,updateCartItemQtyCOntroller);
export default cartRouter;