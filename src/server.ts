import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/database";
import { authenticateToken } from "./middleware/auth.middleware";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";

// Conexión a la base de datos
connectDB();

const app = express();

// Middlewares Globales
app.use(cors(corsConfig)); // Habilitar CORS
app.use(morgan("dev")); // Logger
app.use(express.json()); // Leer datos de formularios

// Routes
app.use("/auth", authRoutes);
app.use("/api/books", authenticateToken, bookRoutes);

export default app;
