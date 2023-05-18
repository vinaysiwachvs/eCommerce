const express=require('express');
const router =express.Router();
const productController = require("../controller/product_controller");
const { verifyToken } = require("../controller/auth_controller");

router.route("/").post(verifyToken, productController.createProduct);

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProductById);
router.route("/:id/reviews").post(verifyToken, productController.createReview);
module.exports = router;
