const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user"); 
const { getOrder, orderById }= require("../controllers/order");  
const { tableById } = require("../controllers/table");  
const { chairById, list, read, remove, addOrder } = require('../controllers/chair');
const { getProduct }= require("../controllers/product");  

router.get("/chairs/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    list
);

router.get("/chair/:orderId/:userId", 
    requireSignin,     
    isAuth,  
    isWaiter, 
    read
);
 
router.delete("/chair/remove/:chairId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    getOrder,
    remove
);

router.post("/chair/addOrder/:tableId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getOrder, 
    getProduct,
    addOrder
);

router.param("tableId", tableById);
router.param("chairId", chairById);
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;