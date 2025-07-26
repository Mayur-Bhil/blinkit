import {Router} from "express";
import { CreateProductController, getProductController } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";

const ProductRouter = Router();


ProductRouter.post("/create",auth,CreateProductController);
ProductRouter.post("/get",getProductController);

export default ProductRouter;