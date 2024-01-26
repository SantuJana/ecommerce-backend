const router = require('express').Router()
const { list } = require('../../controllers/admin/customer.controller')

router.get("", list)

module.exports = router