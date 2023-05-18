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

exports.getAllProducts = async (req,res) => {
    try{
        const products = await productService.getAllProduct();
        return res.json(products);
    }catch(error){
        console.log("error in getting product ", error)
        res.status(400).send({ message: error.message });
    }
};

exports.getProductById = async (req,res) => {
    try{
        const id = req.params.id;
        const product = await productService.getProductById(id);
        if (!product ) {
        res.status(404).send("Product not found");
        }else res.status(200).json(product);
    }catch(error){
        console.log("error in getting product by id ", error);
        res.status(400).send({ message: error.message });
    }
};



exports.createReview = async(req, res) => {
    try {
        // const { productId } = req.params;
        const  productId  = req.params.id;
        const { name, comment, rating } = req.body;
        // const userId = req.user_id;

        const result = await productService.createReview(
            productId,
            name,
            comment,
            rating,
            // userId
        );

        res.status(201).json(result);
    } catch (error) {
        console.error("error occured in adding a review",error);
        res.status(500).json({ message: "Internal server error" });
    }
};