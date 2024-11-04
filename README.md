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
