const express = require("express");
const router = express.Router();

const { orderById, read, remove, confirmOrder, listOpen, listClosed, listAll } = require('../controllers/order');
const { getTable } = require("../controllers/table");  
const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");  
  
router.get("/order/:orderId/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    read
);

router.get("/orders/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listOpen
);

router.get("/orders/closed/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listClosed
);

router.get("/orders/all/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    listAll
);
 
router.delete("/order/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    getTable,
    remove
); 

router.post("/order/confirm/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
    confirmOrder
); 

router.param("orderId", orderById); 
router.param("userId", userById);

module.exports = router;