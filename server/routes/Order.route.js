import { Router } from "express";
import auth from "../middlewares/auth.js";
import {CashOndeleveryOrderController} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery",auth,CashOndeleveryOrderController);

export default orderRouter;