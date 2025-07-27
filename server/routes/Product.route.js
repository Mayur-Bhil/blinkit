import {Router} from "express";
import { CreateProductController, getProductByCategory, getProductByCategoryandSubcategory, getProductController } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";

const ProductRouter = Router();


ProductRouter.post("/create",auth,CreateProductController);
ProductRouter.post("/get",getProductController);
ProductRouter.post("/get-product-by-category",getProductByCategory);
ProductRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryandSubcategory);
export default ProductRouter;