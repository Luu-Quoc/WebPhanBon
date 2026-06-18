const express = require("express");

const cors = require("cors");

const productRoute = require("./routes/productRoute");

const customerRoute = require("./routes/customerRoute")

const orderRoute = require("./routes/orderRoute");

const debtRoute = require("./routes/debtRoute");

const adminRoute = require("./routes/adminRoute");

const userRoute = require("./routes/userRoute");

const uploadRoute = require("./routes/uploadRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API PHAN BON");
});

app.use("/api/product",productRoute);
app.use("/api/customer",customerRoute);
app.use("/api/order", orderRoute);
app.use("/api/debt", debtRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/upload",uploadRoute);

module.exports = app;