require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./config/dbconnect') 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
const PORT = process.env.PORT || 5000;

const productRouter=require('./routes/product_routes');
const adminRouter=require('./routes/admin_routes');

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from middleware");
    next();
  });

 app.use('/',productRouter);
 app.use('/',adminRouter);

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
