const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getOrdersByCustomer,
  getDebtOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);

router.get("/get-all", getAllOrders);

router.get("/get-details/:id", getOrderDetails);

router.get("/customer/:customerId", getOrdersByCustomer);

router.get("/debts", getDebtOrders);

module.exports = router;
