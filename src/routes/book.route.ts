import { Router } from "express";
import { BookController } from "../controllers/book.controller.js";

const bookRouter = Router();

bookRouter.get('/api/books', BookController.getAll);

export { bookRouter }