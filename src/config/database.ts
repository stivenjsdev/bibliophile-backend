import { exit } from "node:process";
import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Permite la conexión SSL para Render
    },
  },
  logging: false, // Desactivar logs de SQL en producción
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database: ");
    console.log(error.message);
    exit(1);
  }
};
