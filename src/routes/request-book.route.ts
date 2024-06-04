import { Router } from "express";
import { RequestBookController } from "../controllers/request-book.controller.js";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";

import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const requestBookRouter = Router();

requestBookRouter.post('/api/request-books', ProtectMiddleware.protect, upload.single("image"), RequestBookController.createRequestBook);

export { requestBookRouter }