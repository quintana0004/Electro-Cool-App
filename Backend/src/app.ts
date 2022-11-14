import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

console.log("Client Host: ", process.env.CLIENT_HOST);

const CLIENT_HOST = process.env.CLIENT_HOST ?? "";

const app = express();
const allowedOrigins = [CLIENT_HOST];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

export default app;
