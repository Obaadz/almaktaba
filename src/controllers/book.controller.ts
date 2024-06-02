import type { Request, Response } from 'express';
import { BookService } from '../services/book.service.js';
import { Filter } from '../utils/enums.js';

export class BookController {
  public static async getAllBooksWithNoLibrary(req: Request, res: Response): Promise<void> {
    try {
      if (req.query.category && typeof req.query.category == 'string')
        req.query.category = [Number(req.query.category) as any]
      else if (req.query.category && Array.isArray(req.query.category))
        req.query.category = req.query.category.map((category) => Number(category)) as any

      console.log(req.query.category)
      console.log(req.query.filter)

      const sort = {}

      if (req.query.filter) {
        switch (req.query.filter as string) {
          case Filter.LOWEST_PRICE_TO_HIGHEST.toString():
            sort['price'] = 'ASC'
            break
          case Filter.HIGHEST_PRICE_TO_LOWEST.toString():
            sort['price'] = 'DESC'
            break
          case Filter.TOP_SELLING.toString():
            sort['salesCount'] = 'DESC'
            break
          case Filter.NEW.toString():
            sort['status'] = 'DESC'
            break
          case Filter.USED.toString():
            sort['status'] = 'ASC'
            break
        }
      }

      const books = await BookService.getAll({
        library: null,
        categories: req.query.category as any,
        search: req.query.search && req.query.search != 'null' ? req.query.search as string : null
      }, sort)

      if (req.query.filter == Filter.TOP_RATED.toString()) {
        books.sort((a, b) => Number(b.library.totalRate) - Number(a.library.totalRate))
      }

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
