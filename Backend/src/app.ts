import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jobOrdersRouter from "./routes/job-orders/job-orders.router";

dotenv.config();

const CLIENT_HOST = process.env.CLIENT_HOST ?? "";

const app = express();
const allowedOrigins = [CLIENT_HOST];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

// --- Routes ---
app.use("/job-orders", jobOrdersRouter);

export default app;
