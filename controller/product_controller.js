const Product = require("../model/product");
const productService = require("../service/product_service");

exports.createProduct = async(req, res) => {
    try {
        const { name, description, icon, images, url, cost } = req.body;
        const user = req.loggedInUser;
        if (!user) {
            throw new Error("User not found");
        }
        const product = new Product({
            name,
            description,
            icon,
            images,
            url,
            cost,
            createdBy: user._id,
            updatedBy: user._id,
        });
        await productService.createProduct(product);

        res.status(201).send({ message: "Product created successfully" });
    } catch (error) {
        console.log("error in product create  ", error);
        res.status(400).send({ message: error.message });
    }
};