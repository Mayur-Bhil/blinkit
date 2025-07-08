import { Router } from "express";
import auth from "../middlewares/auth.js";
import { UploadCategoryController } from "../controllers/category.controller.js";
const CategoryRouter = Router();

CategoryRouter.post("/add-category",auth,UploadCategoryController); 





export default CategoryRouter;