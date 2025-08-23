import { Router } from "express";
import auth from "../middlewares/auth.js";
import { 
    CashOndeleveryOrderController, 
    onlinePaymentController,
    updateOrderStatusController 
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOndeleveryOrderController);
orderRouter.post("/checkout", auth, onlinePaymentController);
orderRouter.post("/update-status/:orderId", auth, updateOrderStatusController);

export default orderRouter;