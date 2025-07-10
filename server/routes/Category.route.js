import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getCategoryController, updateCategoryController, UploadCategoryController } from "../controllers/category.controller.js";
const CategoryRouter = Router();

CategoryRouter.post("/add-category",auth,UploadCategoryController); 
CategoryRouter.get("/get",getCategoryController);
CategoryRouter.put("/update",auth,updateCategoryController);





export default CategoryRouter;