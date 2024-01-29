const router = require('express').Router()
const { list, toggleStatus, deleteCustomer } = require('../../controllers/admin/customer.controller')

router.get("", list)
router.post("/delete", deleteCustomer)
router.get("/toggle-status/:id", toggleStatus)

module.exports = router