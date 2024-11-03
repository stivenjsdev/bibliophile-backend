import Book, { BookCreationAttributes } from "../models/book.model";

export class BookService {
  static async createBook(data: BookCreationAttributes): Promise<Book> {
    return await Book.create(data);
  }

  static async getAllBooks(): Promise<Book[]> {
    return await Book.findAll();
  }

  static async getBookById(id: number): Promise<Book | null> {
    return await Book.findByPk(id);
  }

  static async updateBook(
    id: number,
    data: Partial<BookCreationAttributes>
  ): Promise<Book | null> {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.update(data);
    return book;
  }

  static async deleteBook(id: number) {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      return true;
    }
    return false;
  }
}
