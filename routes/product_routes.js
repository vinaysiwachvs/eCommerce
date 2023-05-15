const express=require('express');
const router =express.Router();
const productController = require("../controller/product_controller");
const { verifyToken } = require("../controller/auth_controller");

router.route("/").post(verifyToken, productController.createProduct);

module.exports = router;