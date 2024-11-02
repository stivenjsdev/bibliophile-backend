import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

export const config = {
    PORT: process.env.PORT || 4000,
    DATABASE_URL: process.env.DATABASE_URL as string,
    // NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    // añade más variables de entorno aquí según sea necesario
};
