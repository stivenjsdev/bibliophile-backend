# Bibliophile - Backend

Este proyecto es el backend de **Bibliophile**, una aplicación de gestión de libros. Desarrollado en **Node.js** con TypeScript, Express y Sequelize, este backend permite la autenticación y autorización de usuarios para que puedan gestionar sus colecciones de libros de manera segura. La base de datos está implementada en PostgreSQL y alojada en **Render**.

## Características

- CRUD de libros con autenticación y autorización
- Autenticación de usuarios mediante JSON Web Tokens (JWT)
- Protección de datos de usuarios: cada usuario solo puede gestionar sus propios libros
- Validación de datos de entrada
- Paginación y búsqueda avanzada de libros
- Asociación de libros con su usuario propietario

## Tecnologías

- **Node.js**: Entorno de ejecución (versión 22.11.0 o superior)
- **Express**: Framework para construir la API
- **TypeScript**: Tipado estático para JavaScript
- **Sequelize**: ORM para manejar la base de datos
- **PostgreSQL en Render**: Base de datos relacional alojada en Render
- **JWT**: Manejo de tokens para autenticación
- **bcrypt**: Encriptación de contraseñas de usuario
- **express-validator**: Validación de datos de entrada

## Instalación

### Requisitos previos

- Node.js (versión 22.11.0 o superior)
- PostgreSQL (configurado y en ejecución en Render o en otro servidor)

### Clonar el repositorio

```bash
git clone https://github.com/stivenjsdev/bibliophile-backend.git
cd bibliophile-backend
```

### Instalación de dependencias

Instala las dependencias del proyecto:

```bash
npm install
```

### Configuración de variables de entorno

Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

```plaintext
DATABASE_URL=postgres://<DB_USER>:<DB_PASS>@<DB_HOST>:<DB_PORT>/<DB_NAME>
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=palabrasupersecreta
```

- DATABASE_URL: URL de conexión de tu base de datos PostgreSQL en Render.
- JWT_SECRET: Clave secreta para firmar los tokens JWT.
- PORT: Puerto en el que se ejecutará la API.
- FRONTEND_URL: URL de la app frontend que la consumirá.

### Ejecución del servidor

Inicia el servidor con:

```bash
npm run dev:api
```

La API estará disponible en http://localhost:4000.

## Estructura del Proyecto

```plaintext
├── controllers      # Controladores de la API
│   ├── auth.controller.ts
│   └── book.controller.ts
├── middleware       # Middlewares de autenticación y validación
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
├── models           # Modelos de Sequelize
│   ├── user.model.ts
│   └── book.model.ts
├── routes           # Definición de rutas de la API
│   ├── auth.routes.ts
│   └── book.routes.ts
├── services         # Servicios de lógica de negocio
│   ├── auth.service.ts
│   └── book.service.ts
├── config           # Configuración db, cors y envs
│   ├── database.ts
│   ├── config.ts
│   └── cors.ts
└── server.ts        # Archivo principal del servidor
└── index.ts         # Archivo de Entrada
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.

## Endpoints

### Base URL

```
http://localhost:4000/api
```

---

## Autenticación (`/auth`)

### **[POST] /auth/register**

- **Descripción**: Registra un nuevo usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "string",
    "phone": "string",
    "password": "string"
  }
  ```
- **Respuesta**:
  - **201 Created**: Usuario registrado exitosamente.
  - **Body**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "string",
        "name": "string",
        "phone": "string"
      }
    }
    ```

---

### **[POST] /auth/login**

- **Descripción**: Inicia sesión de un usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "phone": "string",
    "password": "string"
  }
  ```
- **Respuesta**:
  - **200 OK**: Devuelve un token de autenticación y el usuario.
  - **Body**:
    ```json
    {
      "token": "string",
      "user": {
        "id": "string",
        "name": "string",
        "phone": "string"
      }
    }
    ```

---

### **[GET] /auth/validate**

- **Descripción**: Valida un token de autenticación.
- **Headers**: `Authorization: Bearer <token>`
- **Respuesta**:
  - **200 OK**: Token válido.
  - **Body**:
    ```json
    {
      "message": "Token is valid",
      "user": {
        "id": "string",
        "name": "string",
        "phone": "string"
      }
    }
    ```

---

## Gestión de Libros (`/api/books`)

### **[POST] /api/books/**

- **Descripción**: Crea un nuevo libro.
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "string",
    "author": "string",
    "genre": "string",
    "status": "number",
    "rating": "number"
  }
  ```
- **Respuesta**:
  - **201 Created**: Libro creado exitosamente.
  - **Body**:
    ```json
    {
      "id": "number",
      "title": "string",
      "author": "string",
      "genre": "string",
      "status": "number",
      "rating": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

---

### **[GET] /api/books/**

- **Descripción**: Obtiene una lista de libros.
- **Parámetros de consulta**:
  - `page`: Número de página (opcional, entero)
  - `limit`: Cantidad de libros por página (opcional, entero)
- **Respuesta**:
  - **200 OK**: Devuelve una lista de libros con paginación.
  - **Body**:
    ```json
    {
      "books": [
        {
          /* detalles del libro */
        }
      ],
      "pagination": {
        "page": "number",
        "limit": "number",
        "total": "number",
        "totalPages": "number"
      }
    }
    ```

---

### **[GET] /api/books/:id**

- **Descripción**: Obtiene los detalles de un libro por ID.
- **Parámetros de ruta**:
  - `id`: ID del libro (obligatorio, entero)
- **Respuesta**:
  - **200 OK**: Devuelve los detalles del libro.
  - **404 Not Found**: Libro no encontrado.

---

### **[PUT] /api/books/:id**

- **Descripción**: Actualiza los datos de un libro por ID.
- **Parámetros de ruta**:
  - `id`: ID del libro (obligatorio, entero)
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "string",
    "author": "string",
    "genre": "string",
    "status": "number",
    "rating": "number"
  }
  ```
- **Respuesta**:
  - **200 OK**: Libro actualizado.
  - **404 Not Found**: Libro no encontrado.

---

### **[DELETE] /api/books/:id**

- **Descripción**: Elimina un libro por ID.
- **Parámetros de ruta**:
  - `id`: ID del libro (obligatorio, entero)
- **Respuesta**:
  - **200 OK**: Confirmación de eliminación.
  - **404 Not Found**: Libro no encontrado.

---

### **[GET] /api/books/search**

- **Descripción**: Busca libros por filtros.
- **Parámetros de consulta**:
  - `page`, `limit`: Control de paginación
  - `title`, `author`, `genre`, `status`, `rating`: Filtros de búsqueda
- **Respuesta**:
  - **200 OK**: Devuelve una lista de libros filtrados.

---

### **[GET] /api/books/genres**

- **Descripción**: Obtiene una lista de géneros de libros.
- **Respuesta**:
  - **200 OK**: Lista de géneros únicos.
  - **Body**:
    ```json
    ["string"]
    ```
