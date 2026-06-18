const Debt = require("../models/debtModel");
const Customer = require("../models/customerModel");

// Lấy tất cả công nợ
const getAllDebts = async (req, res) => {
  try {
    const debts = await Debt.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách công nợ thành công",
      data: debts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Lấy chi tiết công nợ
const getDebtDetails = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công nợ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết công nợ thành công",
      data: debt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Lấy công nợ theo khách hàng
const getDebtsByCustomer = async (req, res) => {
  try {
    const debts = await Debt.find({
      customerId: req.params.customerId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Lấy công nợ theo khách hàng thành công",
      data: debts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Thanh toán công nợ
const payDebt = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    if (!paidAmount || paidAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Số tiền thanh toán không hợp lệ",
      });
    }

    const debt = await Debt.findById(req.params.id);

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công nợ",
      });
    }

    if (debt.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Công nợ này đã thanh toán xong",
      });
    }

    if (paidAmount > debt.remainingAmount) {
      return res.status(400).json({
        success: false,
        message: "Số tiền trả lớn hơn số tiền còn nợ",
      });
    }

    debt.paidAmount = debt.paidAmount + paidAmount;
    debt.remainingAmount = debt.remainingAmount - paidAmount;

    if (debt.remainingAmount === 0) {
      debt.status = "paid";
    } else {
      debt.status = "partial";
    }

    await debt.save();

    const customer = await Customer.findById(debt.customerId);

    if (customer) {
      customer.totalDebt = customer.totalDebt - paidAmount;

      if (customer.totalDebt < 0) {
        customer.totalDebt = 0;
      }

      await customer.save();
    }

    res.status(200).json({
      success: true,
      message: "Thanh toán công nợ thành công",
      data: debt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Thanh toán công nợ thất bại",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDebts,
  getDebtDetails,
  getDebtsByCustomer,
  payDebt,
};