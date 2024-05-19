import { Book } from '../entities/book.entity.js';

export class BookService {
  public static async getAll(): Promise<Book[]> {
    return Book.find()
  }

}
