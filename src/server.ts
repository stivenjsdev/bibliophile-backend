import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/database";
// import { corsConfig } from "./config/cors";
// import bookRoutes from "./routes/bookRoutes";

dotenv.config();

// Conexión a la base de datos
connectDB();

const app = express();

// Middlewares Globales
// app.use(cors(corsConfig)); // Habilitar CORS
app.use(morgan("dev")); // Logger
app.use(express.json()); // Leer datos de formularios

// Routes
// app.use("/api/books", bookRoutes);

export default app;
