const User = require('../model/user');

// Add a product to the user's cart
exports.addToCart = async (userId, productId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found.');
        }

    const existingProduct = user.cart.find(item => item.productId.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        user.cart.push({ productId, quantity: 1 });
    }

        await user.save();
        return user.cart;
    } catch (error) {
    throw new Error('Failed to add product to cart.');
    }
};

// Remove a product from the user's cart
exports.removeFromCart = async (userId, productId) => {
    try {
        const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found.');
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    return user.cart;
    } catch (error) {
    throw new Error('Failed to remove product from cart.');
    }
};

// Get the user's cart contents
exports.getCart = async (userId) => {
    try {
        const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
        throw new Error('User not found.');
    }

    return user.cart;
    } catch (error) {
    throw new Error('Failed to get cart contents.');
    }
};

// Calculate the total price of items in the user's cart
exports.calculateCartTotal = async (userId) => {
    try {
        const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
        throw new Error('User not found.');
    }

    let total = 0;

    user.cart.forEach(item => {
      total += item.productId.price * item.quantity;
    });

    return total;
    } catch (error) {
    throw new Error('Failed to calculate cart total.');
    }
};
