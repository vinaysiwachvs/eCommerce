// const AuthError = require("../errors/autherror");
const Product = require("../model/product");

const getAllProduct = async (page, limit) => {
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  if (parsedPage < 0 || parsedLimit < 0)
    throw new Error(`Please enter a positive value for page number or limit`);

  const skipIndex = (parsedPage - 1) * parsedLimit;

  const products = await Product.aggregate([
    {
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

  if (!products[0]) throw new Error("Product not found");

  return products;
};

const createProduct = async (product) => {
  console.log("In create Product ", product);
  await product.save();
  return product.id;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  console.log(product);
  return product;
};

const createReview = async (productId, review) => {
    // Find the product by ID
    const product = await Product.findById(productId);

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

    // Add the review to the product's reviews array
    product.reviews.push(review);

    // Calculate the new average rating for the product
    const totalReviews = product.reviews.length;
    const averageRating =
      (product.rating * (totalReviews - 1) + review.rating) / totalReviews;
    product.rating = averageRating;

    await Product.updateOne({ _id: productId }, { $set: product });

    return "Review posted successfully";
};

const deleteProduct = async (productId) => {
    try{
        
       const deletedProduct= await Product.findByIdAndRemove(productId);
       if(!deletedProduct){
        console.log("product not found");
        return { message: "product do not exist" };
       }
       else  return { message: "product deleted successfully" };
    } catch(error){
        console.error(error);
        throw new Error("Failed to delete review");
    }
}

module.exports = { createProduct, getProductById, getAllProduct,createReview};
