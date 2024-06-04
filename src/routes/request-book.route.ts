import { Router } from "express";
import { RequestBookController } from "../controllers/request-book.controller.js";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";

const requestBookRouter = Router();

requestBookRouter.post('/api/request-books', ProtectMiddleware.protect, RequestBookController.createRequestBook);

export { requestBookRouter }