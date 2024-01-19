const express = require("express");
const testRoutes = require('./api/test.route');
const authRoutes = require('./api/auth.route');

const router = express.Router();

router.use(testRoutes);
router.use('/auth', authRoutes);

module.exports = router;
