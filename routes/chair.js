const express = require("express");
const router = express.Router();

const { chairById, list, read, remove, addOrder } = require('../controllers/chair');
const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user"); 
const { tableById } = require("../controllers/table");  
const { getOrder, orderById }= require("../controllers/order");  

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
    remove
);

router.post("/chair/addOrder/:tableId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getOrder, 
    addOrder
);

router.param("tableId", tableById);
router.param("chairId", chairById);
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;