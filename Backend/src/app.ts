import express from "express";

import customerRouter from "./routes/customers/customers.router";
import carRouter from "./routes/cars/cars.router";


const app = express();
app.use(express.json());

app.use("/customers", customerRouter);
app.use("/cars", carRouter);


export default app;