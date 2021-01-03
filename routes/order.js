const express = require("express");
const router = express.Router();

const { orderById, 
        read,
        remove, 
        confirmOrder, 
        listOpen, 
        listClosed, 
        listAll } = require('../controllers/order');
const { getTable } = require("../controllers/table");  
const { requireSignin, 
        isAuth, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");  
 
/**
* @swagger
* tags: 
*  - name: Order
*    description: Operations about orders
*/ 
 
/**
 * @swagger 
 * /api/order/{orderId}/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: orderId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the order to get
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Order
 *    summary: Get order
 *    description: Use to get order by his ID, is used only for WAITER role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/order/:orderId/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    read
);

/**
 * @swagger 
 * /api/orders/{userId}:
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
 *      - Order
 *    summary: Get open orders
 *    description: Use to get all open orders, is used only for WAITER role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/orders/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listOpen
);

/**
 * @swagger 
 * /api/orders/closed/{userId}:
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
 *      - Order
 *    summary: Get closed orders
 *    description: Use to get all closed orders, is used only for WAITER role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/orders/closed/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listClosed
);

/**
 * @swagger 
 * /api/orders/all/{userId}:
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
 *      - Order
 *    summary: Get all orders
 *    description: Use to get all orders, is used only for WAITER role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/orders/all/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listAll
);
 

/**
 * @swagger 
 * /api/order/{orderId}/{userId}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: orderId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the order to delete
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Order
 *    summary: Delete order
 *    description: Use to delete and order by his ID, the order is deleted only if there are no items already processed, is used only for WAITER role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 *      "404":
 *        description: An error according to the data provided  
 */
router.delete("/order/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    getTable,
    remove
); 

/**
 * @swagger 
 * /api/order/confirm/{orderId}/{userId}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: orderId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the order to get
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Order
 *    summary: Confirm order
 *    description: Use to confirm all items that's status be 'Ingresed' (it changes to 'Confirmed' status), is used only for WAITER role
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response  
 *      "404":
 *        description: An error according to the data provided                
 */
router.post("/order/confirm/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    confirmOrder
); 

router.param("orderId", orderById); 
router.param("userId", userById);

module.exports = router;