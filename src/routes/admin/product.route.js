const express = require('express');
const { list, categoryList, addEditCategory, deleteCategory, toggleCategoryStatus } = require('../../controllers/admin/product.controller');

const router = express.Router();

router.get('', list);
router.get('/category', categoryList);
router.post('/category', addEditCategory);
router.post('/category/delete', deleteCategory);
router.get("/category/toggle-status/:id", toggleCategoryStatus)

module.exports = router;