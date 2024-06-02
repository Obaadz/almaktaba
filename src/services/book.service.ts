import { IsNull, Like, In } from 'typeorm';
import { Book } from '../entities/book.entity.js';
import { BookStatus } from '../utils/enums.js';

export class BookService {
  public static async getAll(query: { library: number | null, categories?: number[] | null, search?: string, status?: BookStatus }, order?: {
    salesCount?: 'ASC' | 'DESC',
  }): Promise<Book[]> {
    const where = query.search ? [
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
        title: Like(`%${query.search}%`),
        status: query.status || undefined
      },
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
        author: Like(`%${query.search}%`),
        status: query.status || undefined
      }
    ] : [
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
        status: query.status || undefined
      }
    ]

    return Book.find({
      where,
      order
    })
  }

  public static async getOneById(id: number): Promise<Book | undefined> {
    return Book.findOneBy({ id })
  }
}
