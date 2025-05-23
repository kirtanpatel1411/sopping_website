const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllproduct,
  createProduct,
  getproduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllproduct);
router.get("/:id", getproduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", upload.single("image"), createProduct);

module.exports = router;
