const express = require('express');
const tryCatch = require('../../utils/tryCatch');
const { createAccount } = require('../../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * tags: 
 *  name: Authentication
 *  description: User Authentications
 * 
 * /auth/create-account:
 *  post:
 *      summary: Create Account
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
*               application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email:
 *                          password:
 *      responses:
 *          200:
 *              description: User created Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */
router.post('/create-account', tryCatch(createAccount));

module.exports = router;