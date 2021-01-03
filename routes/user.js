const express = require("express");
const router = express.Router();
 
const { requireSignin, 
        isAuth, 
        isAdmin } = require("../controllers/auth");
const { userById, 
        read, 
        update, 
        list, 
        getRolesValues } = require("../controllers/user");
const { updateuserValidator} = require("../validators/auth");
 
/**
* @swagger
* tags:
*  - name: User
*    description: Operations about users and his roles 
*/  
 
/**
 * @swagger 
 * /api/users/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - User
 *    summary: Get users
 *    description: Use to list all users, is used only for ADMIN role
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied                 
 *      "400":
 *        description: A bad request response
 */
router.get("/users/:userId",    
    requireSignin, 
    isAuth, 
    isAdmin, 
    list
);

/**
 * @swagger 
 * /api/user/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - User
 *    summary: Get specific user
 *    description: Use to list details of user, is used only for ADMIN role
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied                
 *      "400":
 *        description: A bad request response
 */
router.get("/user/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    read
);

/**
 * @swagger 
 * /api/user/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - User
 *    summary: Update an user
 *    description: Use to update specific user, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              role: 
 *                type: string
 *                description: role for user
 *              name: 
 *                type: string
 *                description: name for user
 *              deleted: 
 *                type: boolean
 *                description: if user is deleted or not
 *              enabled: 
 *                type: boolean
 *                description: if user is enabled or not
 *              email: 
 *                type: string
 *                description: email user valid  
 *              password:
 *                type: string
 *                description: password user valid
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response
 */
router.put("/user/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    updateuserValidator,
    update
); 
 
/**
 * @swagger 
 * /api/users/roles/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - User
 *    summary: Get roles
 *    description: Use to get all roles to user, is used only for ADMIN role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 */
router.get("/users/roles/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    getRolesValues
);

// params
router.param("userId", userById);

module.exports = router;