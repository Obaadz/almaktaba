import { Router } from "express";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";
import { OrderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/api/orders', ProtectMiddleware.protect, OrderController.createOrder);

orderRouter.patch('/api/orders/:id/complete', ProtectMiddleware.protect, OrderController.completeOrder);
orderRouter.patch('/api/orders/:id/rate', ProtectMiddleware.protect, OrderController.rateOrder);

export { orderRouter }