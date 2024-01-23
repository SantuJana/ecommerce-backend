const express = require('express');
const { signin } = require('../controllers/admin/signin.controller')

const router = express.Router();

router.get("", (req, res) => {
    res.render("pages/index");
});
router.get("/signin",signin)

module.exports = router;