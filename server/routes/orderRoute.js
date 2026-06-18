const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderDetails,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);

router.get("/get-all", getAllOrders);

router.get("/get-details/:id", getOrderDetails);

module.exports = router;