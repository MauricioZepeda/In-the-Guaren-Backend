const express = require("express");
const router = express.Router();
 
const { requireSignin, 
        isAuth, 
        isWaiter, 
        isCashier } = require("../controllers/auth")
const { billById, 
        read, 
        list, 
        listAll, 
        getPayMethodsValues,
        createForOneChair, 
        getBillDetailForChair, 
        createForTable, 
        getBillDetailForTable, 
        deletePreviousUnpayedBillForTable, 
        deletePreviousUnpayedBillForChair,
        payTableBill, 
        payChairBill } = require("../controllers/bill");
const { orderById, 
       getOrderByBill } = require("../controllers/order");
const { userById } = require("../controllers/user");
const { getChair } = require("../controllers/chair");
const { payBillValidator } = require("../validators/bill");
 
/**
* @swagger
* tags: 
*  - name: Bill
*    description: Everything related to order bills
*/ 

/**
 * @swagger 
 * /api/bills/paymethods/{userId}:
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
 *      - Bill
 *    summary: Get pay methods
 *    description: Use to get all pay methods for bill, is used only for CASHIER role
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
router.get("/bills/paymethods/:userId", 
    requireSignin, 
    isAuth, 
    isCashier,     
    getPayMethodsValues
);

/**
 * @swagger 
 * /api/bills/{userId}:
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
 *      - Bill
 *    summary: Get unpaid bills
 *    description: Use to get only unpayed bills, is used only for CASHIER role
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
router.get("/bills/:userId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    list
);

/**
 * @swagger 
 * /api/bills/all/{userId}:
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
 *      - Bill
 *    summary: Get all bills
 *    description: Use to get all bills (paid and unpaid), is used only for CASHIER role
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
router.get("/bills/all/:userId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    listAll
);


/**
 * @swagger 
 * /api/bill/chair/{orderId}/{userId}:
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
 *      - Bill
 *    summary: Create bill for chair
 *    description: Use to create a new account for a specific chair. In case that there are accounts previously created without paying for that chair, these will be eliminated and replaced by the new account, is used only for WAITER role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              chair: 
 *                type: string
 *                description: The ID of the chair that will create the account 
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
router.post("/bill/chair/:orderId/:userId", 
    requireSignin, 
    isAuth, 
    isWaiter, 
    getChair,
    deletePreviousUnpayedBillForChair,
    getBillDetailForChair,
    createForOneChair
);

/**
 * @swagger 
 * /api/bill/table/{orderId}/{userId}:
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
 *      - Bill
 *    summary: Create bill for the table
 *    description: Use it to create a new account for the full table. In case that there are accounts previously created without paying for that table, these will be eliminated and replaced by the new account, is used only for WAITER role 
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
router.post("/bill/table/:orderId/:userId", 
    requireSignin, 
    isAuth, 
    isWaiter, 
    deletePreviousUnpayedBillForTable,
    getBillDetailForTable,
    createForTable
);

/**
 * @swagger 
 * /api/bill/{billId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: billId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the bill to get 
 *    tags:
 *      - Bill
 *    summary: Get bill
 *    description: Use to get a specific bill by his ID, is used only for CASHIER role
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
router.get("/bill/:billId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    read
);
 
/**
 * @swagger 
 * /api/bill/table/{billId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: billId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the bill to pay
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Bill
 *    summary: Pay a bill for table
 *    description: Use to pay the bill for the complete table, that is, for all the chairs, that leaves the account in the paid state and the table in the closed state, is used only for CASHIER role 
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
router.put("/bill/table/:billId/:userId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    payBillValidator, 
    getOrderByBill,
    payTableBill
);
 
/**
 * @swagger 
 * /api/bill/chair/{billId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: billId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the bill to pay
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Bill
 *    summary: Pay a bill for a chair
 *    description: Use to pay the bill for the specific chair, that leaves all chair's items in payed status, and only if all chairs was previously paid leaves the account in the paid state, and the table in the closed state, is used only for CASHIER role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              payMethod: 
 *                type: string
 *                description: The payment method to be used
 *              tip: 
 *                type: number
 *                description: Total tip to give 
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
router.put("/bill/chair/:billId/:userId", 
    requireSignin, 
    isAuth, 
    isCashier,
    payBillValidator,
    getOrderByBill,  
    payChairBill
);
  
// params
router.param("billId", billById);
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router; 