import { Router } from "express";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";
import { OrderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/api/orders', ProtectMiddleware.protect, OrderController.createOrder);

export { orderRouter }