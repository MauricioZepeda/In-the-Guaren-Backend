const express = require("express");
const router = express.Router();

const { tableById,
        list,
        create,
        read,
        updateWaiter,
        updateAdmin,
        listAll,
        getAreasValues,
        openTable } = require("../controllers/table");
const { requireSignin, 
        isAuth, 
        isAdmin, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");
const { addTableValidator, 
        updateTableAdminValidator,
        updateTableWaiterValidator,
        listTablesByAreaValidator } = require("../validators/table");

/**
* @swagger
* tags:
*  - name: Table
*    description: Management of Table
*/  

/**
 * @swagger 
 * /api/tables:
 *  get:  
 *    tags:
 *      - Table
 *    summary: Get tables by area
 *    description: Use to get tables by area
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              area: 
 *                type: string
 *                description: Area to get the tables
 *    responses:
 *      "200":
 *        description: A sucessful response          
 *      "400":
 *        description: A bad request response
 */
router.get("/tables",
    listTablesByAreaValidator, 
    list
);

/**
 * @swagger 
 * /api/tables/all/{userId}:
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
 *      - Table
 *    summary: Get all tables (enabled and deleted)
 *    description: Use to all tables, is used only for ADMIN role
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
router.get("/tables/all/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    listAll
);
 
/**
 * @swagger 
 * /api/table/create/{userId}:
 *  post:
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
 *      - Table
 *    summary: Create table
 *    description: Use to create a new table, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              area: 
 *                type: string
 *                description: Name for area
 *              number: 
 *                type: number
 *                description: Number for the table
 *              deleted: 
 *                type: boolean
 *                description: If table is deleted or not
 *              enabled: 
 *                type: boolean
 *                description: If table is enabled or not 
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
router.post("/table/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    addTableValidator,
    create
);

/**
 * @swagger 
 * /api/table/{tableId}/{userId}:
 *  get:  
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
 *      - Table
 *    summary: Get table
 *    description: Use to get an specific table by his ID, is used only for WAITER role
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
router.get("/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    read
);
 
/**
 * @swagger 
 * /api/table/{tableId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: tableId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the table to update 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Table
 *    summary: Update table
 *    description: Use to update a table (only can update area and number), is used only for WAITER role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              area: 
 *                type: string
 *                description: Name for area
 *              number: 
 *                type: number
 *                description: Number for the table 
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
router.put("/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    updateTableWaiterValidator,
    updateWaiter
);

/**
 * @swagger 
 * /api/table/{tableId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: tableId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the table to update 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Table
 *    summary: Update table
 *    description: Use to update a table, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              area: 
 *                type: string
 *                description: Name for area
 *              number: 
 *                type: number
 *                description: Number for the table
 *              deleted: 
 *                type: boolean
 *                description: If table is deleted or not
 *              enabled: 
 *                type: boolean
 *                description: If table is enabled or not 
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
router.put("/table/update/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateTableAdminValidator,
    updateAdmin
);
 
/**
 * @swagger 
 * /api/tables/areas:
 *  get:  
 *    tags:
 *      - Table
 *    summary: Get areas
 *    description: Use to get all areas of restaurant
 *    responses:
 *      "200":
 *        description: A sucessful response       
 */
router.get("/tables/areas", 
    getAreasValues
);
 
/**
 * @swagger 
 * /api/table/open/{tableId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: tableId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the table to update 
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Table
 *    summary: Open a table
 *    description: Use to open a closed table only, is used only for WAITER role  
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
router.put("/table/open/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    openTable
);
 
// params
router.param("tableId", tableById);
router.param("userId", userById);
 
module.exports = router;