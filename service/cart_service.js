const User = require("../model/user");
const Product = require("../model/product");
// Add a product to the user's cart
exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  const existingProduct = await User.findOne({
    _id: userId,
    "cart.productId": productId,
  });

  let res;
  if (existingProduct) {
    res = await User.updateOne(
      { _id: userId, "cart.productId": productId },
      { $inc: { "cart.$.quantity": 1 } }
    );
  } else {
    res = await User.updateOne(
      { _id: userId },
      { $push: { cart: { productId, quantity } } }
    );
  }
  return res;
};

// Remove a product from the user's cart
exports.removeFromCart = async (userId, productId) => {
  const user = await User.findById(userId);

  const res = await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        cart: {
          productId: productId,
        },
      },
    },
    { new: true }
  );
  if (res.modifiedCount == 0)
    throw new Error("PRoduct doesnot Exists in the cart");
  return res;
};

// Get the user's cart contents
exports.getCart = async (userId) => {
  const user = await User.findOne({ _id: userId }).populate("cart.productId");
  console.log(user);
  return user.cart;
};

// Calculate the total price of items in the user's cart
exports.calculateCartTotal = async (userId) => {
    const user = await User.findById(userId).populate("cart.productId");
    console.log(user.cart);
    if (!user) {
      throw new Error("User not found.");
    }

    let total = 0;

    user.cart.forEach((item) => {
      console.log(item.productId.cost, item.quantity);
      total += item.productId.cost * item.quantity;
    });

    return total;
  
};
