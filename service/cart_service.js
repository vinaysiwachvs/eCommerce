const user = require("../model/user");
const User = require("../model/user");

// Add a product to the user's cart
exports.addToCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();
    return user.cart;
  } catch (error) {
    throw new Error("Failed to add product to cart.");
  }
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
  if(res.modifiedCount== 0) throw new Error("PRoduct doesnot Exists in the cart") ;
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
  try {
    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      throw new Error("User not found.");
    }

    let total = 0;

    user.cart.forEach((item) => {
      total += item.productId.price * item.quantity;
    });

    return total;
  } catch (error) {
    throw new Error("Failed to calculate cart total.");
  }
};
