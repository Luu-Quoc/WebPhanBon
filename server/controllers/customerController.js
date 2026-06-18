const Customer = require("../models/customerModel");

// Lấy tất cả người dùng
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy người dùng thành công",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Lấy chi tiết người dùng
const getCustomerDetails = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết người dùng thành công",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Thêm người dùng
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Thêm người dùng thành công",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Thêm người dùng thất bại",
      error: error.message,
    });
  }
};

// Cập nhật người dùng
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật người dùng thành công",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Cập nhật người dùng thất bại",
      error: error.message,
    });
  }
};

// Xóa người dùng
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa người dùng thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Xóa người dùng thất bại",
      error: error.message,
    });
  }
};

module.exports = {
    getAllCustomers,
    getCustomerDetails,
    createCustomer,
    updateCustomer,
    deleteCustomer
};