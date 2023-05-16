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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (err instanceof AuthError) {
        console.log("In auth error handler ");
        console.log("In error handler ", err);
        return res.status(err.status).send({ message: err.message });
    } else if (err instanceof ValidationError) {
        console.log("In validation error handler ");
        return res.status(err.status).send({ message: err.message });
    }

    console.log("In error handler ", err);
    res.status(500).send({ message: err.message });
}

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