import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addSubCategoryController } from "../controllers/subCategory.controller.js";
const subCategoryRouter = Router();

subCategoryRouter.post("/create",auth,addSubCategoryController)


export default subCategoryRouter