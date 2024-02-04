const express = require('express');
const { list } = require('../../controllers/admin/product.controller');

const router = express.Router();

router.get('', list);

module.exports = router;