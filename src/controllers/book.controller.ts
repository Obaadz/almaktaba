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

      const sort = {}

      if (req.query.salesCount && req.query.salesCount != 'null')
        sort['salesCount'] = req.query.salesCount
      if (req.query.price && req.query.price != 'null')
        sort['price'] = req.query.price
      if (req.query.topRated && req.query.topRated != 'null')
        sort['user'] = {
          totalRate: req.query.topRated
        }

      const books = await BookService.getAll({
        library: null,
        categories: req.query.category as any,
        search: req.query.search && req.query.search != 'null' ? req.query.search as string : null
      }, sort)

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
