import { Request, Response } from "express";
import { BookFilters, BookService } from "../services/book.service";

export class BookController {
  static async createBook(req: Request, res: Response) {
    try {
      const book = await BookService.createBook({
        ...req.body,
        user_id: req.userId,
      });
      res.status(201).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error creating book", error });
    }
  }

  static async getAllBooks(req: Request, res: Response) {
    try {
      // Obtener los parámetros de consulta
      const page = parseInt(req.query.page as string) || 1; // Página actual
      const limit = parseInt(req.query.limit as string) || 10; // Número de registros por página
      const offset = (page - 1) * limit; // Calcular el offset
      const { userId } = req;

      // Obtener los libros con pagination
      const { books, total } = await BookService.getAllBooks(
        { limit, offset },
        userId
      );

      // Calcular el total de páginas
      const totalPages = Math.ceil(total / limit);

      res.json({
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error });
    }
  }

  static async getBookById(req: Request, res: Response) {
    try {
      const book = await BookService.getBookById(
        parseInt(req.params.id),
        req.userId!
      );
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
    try {
      const updatedBook = await BookService.updateBook(
        parseInt(req.params.id),
        req.body,
        req.userId!
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
      const deleted = await BookService.deleteBook(
        parseInt(req.params.id),
        req.userId!
      );
      if (deleted) {
        res.json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting book", error });
    }
  }

  static async searchBooks(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
      const { userId } = req;

      const filters: BookFilters = {
        title: req.query.search as string, // Cambiado de 'title' a 'search'
        author: req.query.search as string, // Añadido para buscar por autor
        genre: req.query.genre as string,
        status: req.query.status
          ? parseInt(req.query.status as string)
          : undefined,
        rating: req.query.rating
          ? parseInt(req.query.rating as string)
          : undefined,
      };

      const { books, total } = await BookService.searchBooks(
        filters,
        {
          limit,
          offset,
        },
        userId!
      );

      const totalPages = Math.ceil(total / limit);

      res.json({
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error searching books", error });
    }
  }

  static async getAllGenres(req: Request, res: Response) {
    try {
      const { userId } = req;
      console.log("controller", userId);
      const genres = await BookService.getAllGenres(userId!);
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: "Error fetching genres", error });
    }
  }
}
