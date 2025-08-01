import {Router} from "express";
import { CreateProductController, getProdctDetails, getProductByCategory, getProductByCategoryandSubcategory, getProductController, updateProductDetails } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import { admin } from "../middlewares/Admin.js";

const ProductRouter = Router();


ProductRouter.post("/create",auth,admin,CreateProductController);
ProductRouter.post("/get",getProductController);
ProductRouter.post("/get-product-by-category",getProductByCategory);
ProductRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryandSubcategory);
ProductRouter.post("/get-product-details",getProdctDetails);
ProductRouter.put("/update-product-details",auth,admin,updateProductDetails);
export default ProductRouter;