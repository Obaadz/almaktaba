import { IsNull } from 'typeorm';
import { Book, BookCategory } from '../entities/book.entity.js';

export class BookService {
  public static async getAll(query: { library: number | null, category?: BookCategory | null | "null" | "all" }): Promise<Book[]> {
    return Book.find({
      where: {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.category || query.category == "null" || query.category == "all" ? undefined : query.category
      }
    })
  }

  public static async getOneById(id: number): Promise<Book | undefined> {
    return Book.findOneBy({ id })
  }
}
