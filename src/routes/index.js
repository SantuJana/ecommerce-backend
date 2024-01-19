const express = require("express");
const apiRoutes = require("./api.route");
const adminRoutes = require("./admin.route");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/ecommerce/admin/v1');
});
router.use("/ecommerce/api/v1", apiRoutes);
router.use("/ecommerce/admin/v1", adminRoutes);
router.all("*", (req, res) => {
  res.send("page not found");
});

module.exports = router;
