CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- Identificador único de usuario
  name VARCHAR(100) NOT NULL, -- Nombre del usuario
  phone VARCHAR(20) UNIQUE NOT NULL, -- Teléfono del usuario, único para autenticación
  password VARCHAR(255) NOT NULL, -- Contraseña encriptada
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última actualización
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY, -- Identificador único del libro
  title TEXT NOT NULL, -- Título del libro
  author TEXT NOT NULL, -- Autor del libro
  status SMALLINT NOT NULL DEFAULT 0 CHECK (status IN (0, 1, 2)), -- Estado del libro con valores restringidos 0: TO_READ, 1: READING, 2: READ
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5), -- Calificación opcional entre 1 y 5
  genre VARCHAR(100) NOT NULL, -- Género del libro
  user_id INTEGER NOT NULL REFERENCES users(id), -- FK al propietario del libro
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última actualización
);

-- Índice para optimizar la búsqueda de libros por usuario
CREATE INDEX idx_books_user_id ON books(user_id);
