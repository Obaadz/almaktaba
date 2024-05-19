import type { Request, Response } from 'express';
import { BookService } from '../services/book.service.js';

export class BookController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookService.getAll()

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
