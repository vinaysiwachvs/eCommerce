const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    validate: {
      validator: function (v) {
        return /^[^<>#$\\/]*[\s,.-]*[^<>#$\\/]*$/.test(v);
      },
      message: (props) =>
        `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
    },
  },

  shortDescription: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
    validate: {
      validator: function (v) {
        return /^[^<>#$\\/]*[\s,.-]*[^<>#$\\/]*$/.test(v);
      },
      message: (props) =>
        `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
    },
  },
  longDescription: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000,
    validate: {
      validator: function (v) {
        return /^[^<>#$\\/]*[\s,.-]*[^<>#$\\/]*$/.test(v);
      },
      message: (props) =>
        `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
    },
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^(http|https):\/\/[^ "]+$/,
  },

  icon: {
    type: String,
    required: true,
    trim: true,
    match: /^(http|https):\/\/[^ "]+$/,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  cost: {
    type: Number,
    required: true,
  },

  images: [String],

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
});

module.exports = mongoose.model("Product", productSchema);