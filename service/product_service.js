// const AuthError = require("../errors/autherror");
const Product = require("../model/product");

const getAllProduct = async () => {
    const product = await Product.find();
    return product;
};

const createProduct = async (product) => {
    console.log("In create Product ", product);
    await product.save();
    return product.id;
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    return product;
};


const createReview = async(productId, review) => {
    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        
        if (!product) {
            throw new Error("Product not found");
        } 
        
    

        // Add the review to the product's reviews array
        product.reviews.push(review);

        // Calculate the new average rating for the product
        const totalReviews = product.reviews.length;
        const averageRating =
            (product.rating * (totalReviews - 1) + review.rating) / totalReviews;
        product.rating = averageRating;

        await Product.updateOne(
            { _id: productId },
            { $set: product}
          );

        return { message: "Review posted successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post review");
    }
};


module.exports = { createProduct, getProductById, getAllProduct,createReview};