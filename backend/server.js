const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth/", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
