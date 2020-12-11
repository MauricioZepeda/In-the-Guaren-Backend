const express = require("express");
const router = express.Router();

// imports
const { signup, signin, signout } = require("../controllers/auth");
const { signUpValidator, signInValidator } = require("../validators/user");


router.post("/signup", signUpValidator, signup);

/**
 * @swagger
 * 
 * /api/signin:
 *  post:
 *    summary: signin user
 *    description: Use to request signin user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email: 
 *                type: string
 *                description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *        description: A sucessful response
 *      "400":
 *        description: A bad request response                 
 */
router.post("/signin", signInValidator, signin);

/**
 * @swagger
 * 
 * /api/signout:
 *  get:
 *    summary: signout user
 *    description: Use to request signout user 
 *    responses:
 *      "200":
 *        description: A sucessful response             
 */
router.get("/signout", signout);

module.exports = router;
