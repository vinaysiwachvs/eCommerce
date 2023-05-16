const User = require('../model/user');
const Product = require('../model/product');
const cartService = require('../service/cart_service')


// Add a product to the user's cart
exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        const userId = req.user.id;
        console.log(userId) 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const existingProduct = user.cart.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1 });
        }
        await user.save();

        res.status(200).json({ message: 'Product added to your cart successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


// Remove a product from the user's cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId } = req.user;
        const { productId } = req.params;

        const cart = await cartService.removeFromCart(userId, productId);

        res.status(200).json({ message: 'Product removed from cart successfully.', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove product from cart.' });
    }
};

// Get the user's cart contents
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.user; 

        const cart = await cartService.getCart(userId);

        res.status(200).json({ cart });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get cart contents.' });
    }
};

// Calculate the total price of items in the user's cart
exports.calculateCartTotal = async (req, res) => {
    try {
        const { userId } = req.user;

        const total = await cartService.calculateCartTotal(userId);

        res.status(200).json({ total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate cart total.' });
    }
};
