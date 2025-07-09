import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getCategoryController, UploadCategoryController } from "../controllers/category.controller.js";
const CategoryRouter = Router();

CategoryRouter.post("/add-category",auth,UploadCategoryController); 
CategoryRouter.get("/get",getCategoryController)





export default CategoryRouter;