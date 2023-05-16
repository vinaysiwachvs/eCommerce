const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart_controller');
const {verifyToken} = require("../controller/auth_controller");

// Add a product to the cart
router.route("/cart").post(verifyToken, cartController.addToCart);

// Remove a product from the cart
router.route("/cart/:productId").delete(verifyToken, cartController.removeFromCart);

// Get the user's cart contents
router.route("/cart").get(verifyToken, cartController.getCart);

module.exports = router;
