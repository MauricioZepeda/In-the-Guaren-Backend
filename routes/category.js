const express = require("express");
const router = express.Router();
 
const { categoryById, 
        list, 
        listAll, 
        create, 
        read, 
        update, 
        remove } = require("../controllers/category");
const { requireSignin, 
        isAuth, 
        isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { addCategoryValidator,  
        updateCategoryValidator} = require("../validators/category");

/**
* @swagger
* tags:
*  - name: Category
*    description: Operations about categories 
*/  

/**
 * @swagger 
 * /api/categories:
 *  get:  
 *    tags:
 *      - Category
 *    summary: Get enabled categories
 *    description: Use to get all categories
 *    responses:
 *      "200":
 *        description: A sucessful response          
 *      "400":
 *        description: A bad request response
 */
router.get("/categories", list);

/**
 * @swagger 
 * /api/categories/all/{userId}:
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
 *      - Category
 *    summary: Get all categories (enabled and deleted)
 *    description: Use to all categories, is used only for ADMIN role
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied         
 *      "400":
 *        description: A bad request response
 */
router.get("/categories/all/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    listAll
);

/**
 * @swagger 
 * /api/category/create/{userId}:
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
 *      - Category
 *    summary: Create category
 *    description: Use to create a new category, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              name: 
 *                type: string
 *                description: Name for category
 *              deleted: 
 *                type: boolean
 *                description: If category is deleted or not
 *              enabled: 
 *                type: boolean
 *                description: If category is enabled or not 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 */
router.post("/category/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    addCategoryValidator,
    create
);

/**
 * @swagger 
 * /api/category/{categoryId}:
 *  get: 
 *    parameters: 
 *      - in: path
 *        name: categoryId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the category to get 
 *    tags:
 *      - Category
 *    summary: Get category
 *    description: Use to get a specific category by his ID
 *    responses:
 *      "200":
 *        description: A sucessful response          
 *      "400":
 *        description: A bad request response
 */
router.get("/category/:categoryId", read);
 
/**
 * @swagger 
 * /api/category/{categoryId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: categoryId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the category to update
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Category
 *    summary: Update category
 *    description: Use to update a category by his ID, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              name: 
 *                type: string
 *                description: Name for category
 *              deleted: 
 *                type: boolean
 *                description: If category is deleted or not
 *              enabled: 
 *                type: boolean
 *                description: If category is enabled or not 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 */
router.put("/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateCategoryValidator,
    update
);

/**
 * @swagger 
 * /api/category/{categoryId}/{userId}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: categoryId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the category to delete
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Category
 *    summary: Delete category
 *    description: Use to delete a category by his ID, is used only for ADMIN role 
 *    responses:
 *      "200":
 *        description: A sucessful response  
 *      "203":
 *        description: Access denied            
 *      "400":
 *        description: A bad request response 
 */
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
 
// params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router; 