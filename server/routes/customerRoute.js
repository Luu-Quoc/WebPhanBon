const express = require("express");

const {
  getAllCustomers,
  getCustomerDetails,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/get-all", getAllCustomers);

router.get("/get-details/:id", getCustomerDetails);

router.post("/create", createCustomer);

router.put("/update/:id", updateCustomer);

router.delete("/delete/:id", deleteCustomer);

module.exports = router;