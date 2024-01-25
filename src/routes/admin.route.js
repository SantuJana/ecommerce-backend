const express = require('express');
const { dashboard } = require('../controllers/admin/dashboard.controller')
const adminAuth = require('../middlewares/auth.admin')
const authRoutes = require('../routes/admin/auth.route')

const router = express.Router();

router.get("/dashboard", adminAuth, dashboard);
router.use("/auth", authRoutes)

module.exports = router;