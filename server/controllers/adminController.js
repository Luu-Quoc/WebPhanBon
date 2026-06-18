const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const Debt = require("../models/debtModel");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCustomers = await Customer.countDocuments();

    const totalOrders = await Order.countDocuments();

    const unpaidDebts = await Debt.find({
      status: {
        $in: ["unpaid", "partial"],
      },
    });

    const totalDebt = unpaidDebts.reduce((sum, debt) => {
      return sum + debt.remainingAmount;
    }, 0);

    const lowStockProducts = await Product.find({
      stock: {
        $lte: 5,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayOrders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const todayRevenue = todayOrders.reduce((sum, order) => {
      return sum + order.paidAmount;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Lấy thống kê dashboard thành công",
      data: {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalDebt,
        todayRevenue,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi lấy thống kê dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};