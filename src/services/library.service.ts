import { Library } from '../entities/library.entity.js';

export class LibraryService {
  public static async getAll(): Promise<Library[]> {
    return Library.find()
  }

}
