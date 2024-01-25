const { view, signin, signout } = require('../../controllers/admin/auth.controller')
const router = require('express').Router()

router.get("/signin", view)
router.post("/signin", signin)
router.get("/signout", signout)

module.exports = router