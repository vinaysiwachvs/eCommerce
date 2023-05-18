// const AuthError = require("../errors/autherror");
const Product = require("../model/product");

const getAllProduct = async(page, limit) => {
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    if (parsedPage < 0 || parsedLimit < 0)
        return `Please enter a positive value for page number or limit`;

    const skipIndex = (parsedPage - 1) * parsedLimit;

    try {
        const products = await Product.aggregate([{
                $project: {
                    _id: 1,
                    name: 1,
                    icon: 1,
                    url: 1,
                    shortDescription: 1,
                    createdOn: 1,
                },
            },
            { $skip: skipIndex },
            { $limit: parsedLimit },
        ]);

        if (!products[0]) throw new ReferenceError("Product not found");

        return products;
    } catch (error) {
        console.log(error.message);
        return;
    }
};

const createProduct = async(product) => {
    console.log("In create Product ", product);
    await product.save();
    return product.id;
};

const getProductById = async(id) => {
    const product = await Product.findById(id);
    console.log(product);
    return product;
};

const createReview = async(productId, name, comment, rating, userId) => {
    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        console.log(product);

        if (!product) {
            throw new Error("Product not found");
        }

        // Create a new review
        const review = {
            name,
            comment,
            rating,
            user: userId,
        };

        // Add the review to the product's reviews array
        product.reviews.push(review);

        // Calculate the new average rating for the product
        const totalReviews = product.reviews.length;
        const averageRating =
            (product.rating * (totalReviews - 1) + rating) / totalReviews;
        product.rating = averageRating;

        // Save the updated product
        await product.save();

        return { message: "Review posted successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post review");
    }
};

module.exports = { createProduct, getProductById, getAllProduct, createReview };