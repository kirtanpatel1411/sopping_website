const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  number: String,
  email: { type: String, required: true, unique: true },
  password: String,
  profileImage: String,
});

module.exports = mongoose.model("User", userSchema);
