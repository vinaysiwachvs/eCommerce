const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./config/dbConnect");
dbConnect.initDB();
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth_routes");
const productRouter = require("./routes/product_routes");
const cartRouter = require("./routes/cart_routes");
const errorController = require("./controller/error_controller");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
// app.use("/api/products/:id/reviews")
app.use(errorController.handleErrors);

app.use((req, res, next) => {
    console.log("Hello from middleware");
    next();
});

process.on("SIGINT", () => {
    dbConnect.disconnectDB();
    console.log("Closing server");
    process.exit();
});

process.on("exit", () => {
    console.log("Server closed");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});