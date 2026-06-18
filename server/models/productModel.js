const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,

    category: String,

    price: Number,

    stock: Number,

    unit: String,

    description: String,

    suitableFor: [String],

    image: String,

    images: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);