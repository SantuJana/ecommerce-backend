const express = require("express");
const { dashboard } = require("../controllers/admin/dashboard.controller");
const adminAuth = require("../middlewares/auth.admin");
const authRoutes = require("./admin/auth.route");
const customerRoutes = require("./admin/customer.route");
const productRoutes = require("./admin/product.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.get("/dashboard", adminAuth, dashboard);
router.use("/customer", adminAuth, customerRoutes);
router.use("/product", adminAuth, productRoutes);

// 404 page not found handling
router.all("*", (req, res) => {
  res.render("pages/404");
});

module.exports = router;
