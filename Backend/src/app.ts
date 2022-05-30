import express from "express";

import customerRouter from "./routes/customers/customers.router";


const app = express();
app.use(express.json());

app.use("/customers", customerRouter);


export default app;