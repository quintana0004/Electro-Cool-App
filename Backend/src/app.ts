import express from "express";

const app = express();
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Typescript Server at port 8000');
})

export default app;