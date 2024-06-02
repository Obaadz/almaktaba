import type { Request, Response } from 'express';
import { BookService } from '../services/book.service.js';

export class BookController {
  public static async getAllBooksWithNoLibrary(req: Request, res: Response): Promise<void> {
    try {
      if (req.query.category && typeof req.query.category == 'string')
        req.query.category = [Number(req.query.category) as any]
      else if (req.query.category && Array.isArray(req.query.category))
        req.query.category = req.query.category.map((category) => Number(category)) as any

      console.log(req.query.category)

      const books = await BookService.getAll({
        library: null,
        categories: req.query.category as any,
        search: req.query.search && req.query.search != 'null' ? req.query.search as string : null
      })

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
