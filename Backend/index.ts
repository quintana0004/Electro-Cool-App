import express from "express";

const app = express();
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Typescript Server at port 8000');
})

// Test Listen
app.listen(8000, () => console.log('Server is running https://localhost:8000'));