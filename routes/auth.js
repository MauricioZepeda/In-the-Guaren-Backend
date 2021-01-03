const express = require("express");
const router = express.Router();
  
const { signup, 
        signin, 
        signout } = require("../controllers/auth");
const { signUpValidator, 
        signInValidator } = require("../validators/auth");

/**
* @swagger
* tags:
*  - name: Auth
*    description: Everything related to user authentication 
*/  

/**
 * @swagger 
 * /api/signup: 
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign up a new user
 *    description: Use to sign up a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name: 
 *                type: string
 *                description: User's name
 *              email: 
 *                type: string
 *                description: User's email to log in 
 *              password:
 *                  type: string
 *                  description: Valid password for user
 *    responses:
 *      "200":
 *        description: A sucessful response
 *      "400":
 *        description: A bad request response                 
 */
router.post("/signup", signUpValidator, signup);
 
/**
 * @swagger 
 * /api/signin: 
 *  post:
 *    tags:
 *      - Auth
 *    summary: Log in to the system
 *    description: Use to log in a user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email: 
 *                type: string
 *                description: email user valid
 *              password:
 *                type: string
 *                description: password user valid
 *    responses:
 *      "200":
 *        description: A sucessful response
 *      "400":
 *        description: A bad request response
 *      "404":
 *        description: An error according to the data provided                
 */
router.post("/signin", signInValidator, signin);

/**
 * @swagger 
 * /api/signout:
 *  get:
 *    tags:
 *      - Auth
 *    summary: Sign out user
 *    description: Use to request signout user 
 *    responses:
 *      "200":
 *        description: A sucessful response             
 */
router.get("/signout", signout);
 
module.exports = router;
