const express = require("express");

const {
  getAllDebts,
  getDebtDetails,
  getDebtsByCustomer,
  payDebt,
} = require("../controllers/debtController");

const router = express.Router();

router.get("/get-all", getAllDebts);

router.get("/get-details/:id", getDebtDetails);

router.get("/customer/:customerId", getDebtsByCustomer);

router.put("/pay/:id", payDebt);

module.exports = router;