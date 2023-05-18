const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        // unique: true,
    },
    icon: {
        type: String,
        // required: true,
    },
    images: [String],
    category: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        // required: true,
    },
    countInStock: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    numReviews: {
        type: Number,
    },
    reviews: [reviewSchema],
    createdOn: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        immutable: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);