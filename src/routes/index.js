const express = require("express");
const apiRoutes = require("./api.route");
const adminRoutes = require("./admin.route");

const router = express.Router();


router.get("/", (req, res) => {
    res.redirect('/admin/dashboard');
});
router.use("/api", apiRoutes);
router.use("/admin", adminRoutes);
router.all("*", (req, res) => {
  res.render("pages/404");
});

module.exports = router;
