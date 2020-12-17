const express = require("express");
const router = express.Router();
 
const { list, read, remove, addItem, removeItem } = require('../controllers/chair'); 
const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user"); 
const { getOrder, orderById }= require("../controllers/order");  
const { tableById } = require("../controllers/table");    

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
 
router.delete("/chair/remove/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,  
    remove
);

router.post("/chair/addItem/:tableId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getOrder,  
    addItem
 
);

router.delete("/chair/removeItem/:orderId/:userId",
    requireSignin, 
    isAuth,
    removeItem
);

router.param("tableId", tableById); 
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;