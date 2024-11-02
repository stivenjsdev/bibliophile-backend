import { CorsOptions } from "cors";
import { config } from "./config";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [config.FRONTEND_URL]; // Agregar más orígenes si es necesario

    if (process.argv[2] === "--api") {
      whitelist.push(undefined);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
