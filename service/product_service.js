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

module.exports = { createProduct, getProductById, getAllProduct};