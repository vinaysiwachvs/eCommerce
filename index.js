const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
000;

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from middleware");
    next();
  });
  app.get("/api/products", (req, res) => {
    console.log("Hello from products");
    res.send("Hello Products GET API 123");
  });
  
  app.get("/", (req, res) => {
    console.log("Hello from root");
    res.send("Hello World");
  });
  
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });