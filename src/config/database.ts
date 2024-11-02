import { exit } from "node:process";
import { Sequelize } from "sequelize";

export const connectDB = async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Permite la conexión SSL para Render
        },
      },
      logging: false, // Desactivar logs de SQL en producción
    });

    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database: ");
    console.log(error.message);
    exit(1);
  }
};
