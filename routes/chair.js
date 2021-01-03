const express = require("express");
const router = express.Router();
 
const { requireSignin, 
        isAuth, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user"); 
const { getProduct } = require("../controllers/product");    
const { getOrder, 
        orderById } = require("../controllers/order");  
const { tableById, 
        getTable } = require("../controllers/table");  
const { getChair, 
        getItem, 
        listChairs, 
        readChair, 
        removeChair, 
        addItem, 
        removeItem, 
        returnItem } = require('../controllers/chair'); 
const { addItemValidator } = require('../validators/item');

/**
* @swagger
* tags:
*  - name: Chair
*    description: Operation of items requested for the chairs 
*/  

/**
 * @swagger 
 * /api/chairs/{orderId}/{userId}:
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
 *      - Chair
 *    summary: Get chairs
 *    description: Use to get chairs by an order ID, is used only for WAITER role
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
router.get("/chairs/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    listChairs
);

/**
 * @swagger 
 * /api/chair/{orderId}/{userId}:
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
 *      - Chair
 *    summary: Get chair
 *    description: Use to get a specific chair by his ID, is used only for WAITER role
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              chair: 
 *                type: string
 *                description: Chair ID
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
router.get("/chair/:orderId/:userId", 
    requireSignin,     
    isAuth,  
    isWaiter, 
    getChair,
    readChair
);
 
/**
 * @swagger 
 * /api/chair/remove/{orderId}/{userId}:
 *  delete:
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
 *      - Chair
 *    summary: Delete chair
 *    description: Use to delete a specific chair by his ID, it is only deleted if the chair does not have orders already processed, is used only for WAITER role
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              chair: 
 *                type: string
 *                description: Chair ID
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
router.delete("/chair/remove/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,  
    getTable,
    getChair,
    removeChair 
);

/**
 * @swagger 
 * /api/chair/addItem/{tableId}/{userId}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: tableId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the table to get
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Chair
 *    summary: Add item
 *    description: Use to add an item (product) to an specific chair by his number, is used only for WAITER role
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              number: 
 *                type: number
 *                description: number of chair
 *              product: 
 *                type: string
 *                description: Product ID
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
router.post("/chair/addItem/:tableId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    addItemValidator,
    getOrder,
    getProduct, 
    addItem 
);

/**
 * @swagger 
 * /api/chair/removeItem/{orderId}/{userId}:
 *  delete:
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
 *      - Chair
 *    summary: Delete an item
 *    description: Use to delete a specific item by his ID, It is only deleted if the item is not already processed, is used only for WAITER role
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              chair: 
 *                type: string
 *                description: Chair ID
 *              item: 
 *                type: string
 *                description: Item ID
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
router.delete("/chair/removeItem/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getChair,
    getItem,
    removeItem
);

/**
 * @swagger 
 * /api/chair/returnItem/{orderId}/{userId}:
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
 *      - Chair
 *    summary: Return item
 *    description: Use it to return an item (product) from a specific chair by its ID, it can only be returned if the item is in 'Ordered' status, it is used only for the role of WAITER 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              chair: 
 *                type: string
 *                description: Chair ID
 *              product: 
 *                type: string
 *                description: Product ID
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
router.post("/chair/returnItem/:orderId/:userId",
    requireSignin, 
    isAuth, 
    isWaiter,
    getChair,
    getItem,
    returnItem
);

router.param("tableId", tableById); 
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;