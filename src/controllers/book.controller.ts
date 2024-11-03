import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookService } from "../services/book.service";

export class BookController {
  static async createBook(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const book = await BookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error creating book", error });
    }
  }

  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error });
    }
  }

  static async getBookById(req: Request, res: Response) {
    try {
      const book = await BookService.getBookById(parseInt(req.params.id));
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching book", error });
    }
  }

  static async updateBook(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const updatedBook = await BookService.updateBook(
        parseInt(req.params.id),
        req.body
      );
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating book", error });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const deleted = await BookService.deleteBook(parseInt(req.params.id));
      if (deleted) {
        res.json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting book", error });
    }
  }
}
