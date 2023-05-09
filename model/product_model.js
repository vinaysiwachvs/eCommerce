const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },

  description: {
    type: String,
    trim: true,
    
    maxlength: 2000,
  },

  cost : {
    type : Number,
    required : true
  },
  icon: {
    type: String,
    required: true,
  },
 
  shortDesc: {
    type: String,
    // required: true,
    maxlength: 400,
  },

  images: {
    type: Array,
    default: [],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
 
  updatedOn: {
    type: Date,
    default: Date.now(),
  }

});

module.exports = mongoose.model("Product", productSchema);
