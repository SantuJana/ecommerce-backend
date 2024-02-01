const router = require('express').Router()
const { list, addEditCustomer, customerDetails, toggleStatus, deleteCustomer } = require('../../controllers/admin/customer.controller')

router.get("", list)
router.post("", addEditCustomer)
router.get("/details/:customerId", customerDetails)
router.post("/delete", deleteCustomer)
router.get("/toggle-status/:id", toggleStatus)

module.exports = router