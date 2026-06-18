const express = require("express");

const {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  adminOnly,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Public
router.get("/get-all", getAllProducts);
router.get("/get-details/:id", getProductDetails);

// Admin Only
router.post(
  "/create",
  protect,
  adminOnly,
  createProduct
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  updateProduct
);

router.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;