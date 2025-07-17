import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addSubCategoryController, getSubCategoryController, UpdateSubcategory } from "../controllers/subCategory.controller.js";
const subCategoryRouter = Router();

subCategoryRouter.post("/create",auth,addSubCategoryController);
subCategoryRouter.post("/get",getSubCategoryController);
subCategoryRouter.put("/update",auth,UpdateSubcategory)


export default subCategoryRouter;