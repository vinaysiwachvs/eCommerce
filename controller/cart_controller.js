const User = require("../model/user");
const Product = require("../model/product");
const cartService = require("../service/cart_service");
// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.loggedInUser._id;
    const result = await cartService.addToCart(userId, productId, quantity);
    res
      .status(200)
      .json({ message: "Product added to your cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Remove a product from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.loggedInUser._id;
    const productId = req.params.productId;

    const cart = await cartService.removeFromCart(userId, productId);

    res
      .status(200)
      .json({ message: "Product removed from cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get the user's cart contents
exports.getCart = async (req, res) => {
  try {
    // console.log(req.loggedInUser._id);
    const userId = req.loggedInUser._id;

    const cart = await cartService.getCart(userId);

    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Calculate the total price of items in the user's cart
exports.calculateCartTotal = async (req, res) => {
  try {
    const userId = req.loggedInUser._id;

    const total = await cartService.calculateCartTotal(userId);

    res.status(200).json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate cart total." });
  }
};
