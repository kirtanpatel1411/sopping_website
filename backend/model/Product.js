const mongoose = require("mongoose");
const productSchemas = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String,
});
module.exports = mongoose.model("Product", productSchemas);
