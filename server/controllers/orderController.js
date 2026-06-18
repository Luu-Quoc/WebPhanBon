const Order = require("../models/orderModel");
const Debt = require("../models/debtModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");

// Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      items,
      paidAmount = 0,
      note = "",
      dueDate = null,
    } = req.body;

    if (!customerId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn khách hàng và sản phẩm",
      });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy khách hàng",
      });
    }

    let orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy sản phẩm ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm ${product.name} không đủ tồn kho`,
        });
      }

      const itemTotal = product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      });

      totalAmount += itemTotal;

      product.stock = product.stock - item.quantity;
      await product.save();
    }

    const debtAmount = totalAmount - paidAmount;

    const order = await Order.create({
      customerId: customer._id,
      customerName: customer.name,
      items: orderItems,
      totalAmount,
      paidAmount,
      debtAmount: debtAmount > 0 ? debtAmount : 0,
      status: debtAmount > 0 ? "debt" : "paid",
      note,
    });

    if (debtAmount > 0) {
      await Debt.create({
        customerId: customer._id,
        customerName: customer.name,
        orderId: order._id,
        amount: debtAmount,
        paidAmount: 0,
        remainingAmount: debtAmount,
        status: "unpaid",
        dueDate,
        note: note || "Công nợ phát sinh từ đơn hàng",
      });

      customer.totalDebt = customer.totalDebt + debtAmount;
      await customer.save();
    }

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tạo đơn hàng thất bại",
      error: error.message,
    });
  }
};

// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách đơn hàng thành công",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// // Lấy chi tiết đơn hàng
// const getOrderDetails = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Không tìm thấy đơn hàng",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Lấy chi tiết đơn hàng thành công",
//       data: order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Lỗi server",
//       error: error.message,
//     });
//   }
// };
const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({
      customerId: req.params.customerId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy lịch sử mua hàng thành công",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy lịch sử mua hàng",
      error: error.message,
    });
  }
};

const getDebtOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      debtAmount: { $gt: 0 },
      status: "debt",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách công nợ thành công",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy công nợ",
      error: error.message,
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getOrdersByCustomer,
  getDebtOrders,
  getOrderDetails,
};
