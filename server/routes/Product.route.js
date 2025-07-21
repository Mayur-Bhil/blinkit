import {Router} from "express";
import { CreateProductController } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";

const ProductRouter = Router();


ProductRouter.post("/create",auth,CreateProductController);

export default ProductRouter;