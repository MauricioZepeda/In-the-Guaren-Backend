const express = require("express");
const router = express.Router();
 
const { getChair, getItem, listChairs, readChair, removeChair, addItem, removeItem } = require('../controllers/chair'); 
const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user"); 
const { getOrder, orderById }= require("../controllers/order");  
const { tableById } = require("../controllers/table");  
const { getProduct } = require("../controllers/product");    

router.get("/chairs/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    listChairs
);

router.get("/chair/:orderId/:userId", 
    requireSignin,     
    isAuth,  
    isWaiter, 
    getChair,
    readChair
);
 
router.delete("/chair/remove/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,  
    getChair,
    removeChair
);

router.post("/chair/addItem/:tableId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getOrder,
    getProduct, 
    addItem 
);

router.delete("/chair/removeItem/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter,
    getChair,
    getItem,
    removeItem
);

router.param("tableId", tableById); 
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;