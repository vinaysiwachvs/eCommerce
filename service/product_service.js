// const AuthError = require("../errors/autherror");
const Product = require("../model/product");


const createProduct = async (product) => {
    console.log("In create Product ", product);
    await product.save();
    return product.id;
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    return product;
};

module.exports = { createProduct, getProductById};