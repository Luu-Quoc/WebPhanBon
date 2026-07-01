const Product = require("../models/productModel");

const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Lấy chi tiết sản phẩm
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Thêm sản phẩm
const createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "phan-bon-ai",
      });

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      unit: req.body.unit,
      description: req.body.description,
      suitableFor: req.body.suitableFor,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Thêm sản phẩm thất bại",
      error: error.message,
    });
  }
};

// Cập nhật sản phẩm
// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Nếu có upload ảnh mới
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "phan-bon-ai",
      });

      product.image = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.unit = req.body.unit;
    product.description = req.body.description;
    product.suitableFor = req.body.suitableFor;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Cập nhật sản phẩm thất bại",
      error: error.message,
    });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Xóa sản phẩm thất bại",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};
