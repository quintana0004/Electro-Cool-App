import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth/auth.router";
import companyRouter from "./routes/company/company.router";
import jobOrdersRouter from "./routes/job-orders/job-orders.router";
import carsRouter from "./routes/cars/cars.router";
import customersRouter from "./routes/customers/customers.router";
import invoicesRouter from "./routes/invoices/invoices.router";
import depositsRouter from "./routes/deposits/deposits.router";
import appointmentsRouter from "./routes/appointments/appointments.router";
import tasksRouter from "./routes/tasks/tasks.router";
import userRouter from "./routes/users/users.router";
import metricsRouter from "./routes/metrics/metrics.router";

dotenv.config();

// --- Express Config ---
const app = express();
app.use(express.json());

// --- Routes ---
app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/job-orders", jobOrdersRouter);
app.use("/cars", carsRouter);
app.use("/customers", customersRouter);
app.use("/invoices", invoicesRouter);
app.use("/deposits", depositsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/tasks", tasksRouter);
app.use("/users", userRouter);
app.use("/metrics", metricsRouter);

export default app;
