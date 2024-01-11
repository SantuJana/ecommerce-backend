const express = require('express');
const tryCatch = require('../../utils/tryCatch');
const User = require('../../models/user.model');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Test
 *  description: This is a test api   
 * /get:
 *  get: 
 *      summary: jnxc sncn
 *      tags: [Test]
 *      responses:
 *          200:
 *              description: djjnd
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

router.get("/get", tryCatch(async (req, res) => {
    // const user = new User({
    //     email: "antu@gmail.com",
    //     password: "12345"
    // })

    // await user.save();
    const s= ''
    s='r'
    res.send({"name":"s"});
}));

module.exports = router;