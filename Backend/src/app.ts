import express from "express";

import customerRouter from "./routes/customers/customers.router";
import carRouter from "./routes/cars/cars.router";
import jobOrderRouter from "./routes/joborders/joborders.router";


const app = express();
app.use(express.json());

app.use("/customers", customerRouter);
app.use("/cars", carRouter);
app.use("/joborders", jobOrderRouter);


export default app;