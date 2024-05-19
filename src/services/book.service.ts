import { Book } from '../entities/book.entity.js';

export class BookService {
  public static async getAll(query: { library: number | null }): Promise<Book[]> {
    if (!query.library)
      return Book.find({ where: { library: null } });

    return Book.find({ where: { library: { id: query.library } } });
  }

}
