import {Router} from "express";
import { CreateProductController, getProductByCategory, getProductController } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";

const ProductRouter = Router();


ProductRouter.post("/create",auth,CreateProductController);
ProductRouter.post("/get",getProductController);
ProductRouter.post("/get-product-by-category",getProductByCategory);

export default ProductRouter;