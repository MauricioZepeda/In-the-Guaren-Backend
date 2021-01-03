const express = require("express");
const router = express.Router();
 
const { create, 
        productById, 
        read, 
        remove, 
        update, 
        list, 
        listAll, 
        photo } = require("../controllers/product");
const { requireSignin, 
        isAuth, 
        isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { categoryById } = require("../controllers/category");
 
/**
* @swagger
* tags:
*  - name: Product
*    description: Management of products and their associated categories 
*/  
 
/**
 * @swagger 
 * /api/products/{categoryId}:
 *  get: 
 *    parameters: 
 *      - in: path
 *        name: categoryId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the category to get 
 *    tags:
 *      - Product
 *    summary: Get products
 *    description: Use to get a list of products by his category
 *    responses:
 *      "200":
 *        description: A sucessful response          
 *      "400":
 *        description: A bad request response
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/products/:categoryId", list);
 
/**
 * @swagger 
 * /api/products/all/{categoryId}/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: categoryId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the category to get
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Product
 *    summary: Get all products (enabled and deleted)
 *    description: Use to all products, is used only for ADMIN role
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
router.get("/products/all/:categoryId/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    listAll
);

/**
 * @swagger 
 * /api/product/create/{userId}:
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
 *      - Product
 *    summary: Create product
 *    description: Use to create a new product, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              name: 
 *                type: string
 *                description: Product's name
 *              description: 
 *                type: string
 *                description: Description about the product
 *              price: 
 *                type: number
 *                description: Product's price
 *              photo: 
 *                type: buffer
 *                description: Contains product's image
 *              category: 
 *                type: string
 *                description: Id of product's category
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
 *      "404":
 *        description: An error according to the data provided  
 */
router.post("/product/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin,  
    create
);

/**
 * @swagger 
 * /api/product/{productId}:
 *  get: 
 *    parameters: 
 *      - in: path
 *        name: productId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the product to get 
 *    tags:
 *      - Product
 *    summary: Get product
 *    description: Use to get a specific product
 *    responses:
 *      "200":
 *        description: A sucessful response          
 *      "400":
 *        description: A bad request response
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/product/:productId", read);
 
/**
 * @swagger 
 * /api/product/{productId}/{userId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    parameters:  
 *      - in: path
 *        name: productId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the product to update
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Product
 *    summary: Update product
 *    description: Use to update a product, is used only for ADMIN role 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties: 
 *              name: 
 *                type: string
 *                description: Product's name
 *              description: 
 *                type: string
 *                description: Description about the product
 *              price: 
 *                type: number
 *                description: Product's price
 *              photo: 
 *                type: buffer
 *                description: Contains product's image
 *              category: 
 *                type: string
 *                description: Id of product's category
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
 *      "404":
 *        description: An error according to the data provided  
 */
router.put("/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

/**
 * @swagger 
 * /api/product/{productId}/{userId}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    parameters:  
 *      - in: path
 *        name: productId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the product to delete
 *      - in: path
 *        name: userId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the user's get the request
 *    tags:
 *      - Product
 *    summary: Delete product
 *    description: Use to delete a product, is used only for ADMIN role  
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
router.delete("/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

/**
 * @swagger 
 * /api/product/photo/{productId}:
 *  get: 
 *    parameters:  
 *      - in: path
 *        name: productId
 *        schema:
 *           type: string
 *           required: true
 *        description: ID of the product 
 *    tags:
 *      - Product
 *    summary: Get product's photo
 *    description: Use get the product's photo  
 *    responses:
 *      "200":
 *        description: A sucessful response   
 *      "400":
 *        description: A bad request response  
 *      "404":
 *        description: An error according to the data provided                
 */
router.get("/product/photo/:productId", photo);
 
router.param("userId", userById);
router.param("productId", productById);
router.param("categoryId", categoryById);

module.exports = router;