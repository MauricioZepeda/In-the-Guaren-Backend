const express = require("express");
const router = express.Router();

const { orderById, read, remove, confirmOrder } = require('../controllers/order');
const { requireSignin, isAuth, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");  
  
router.get("/order/:orderId/:userId", 
    requireSignin, 
    isAuth,  
    isWaiter, 
    read
);
 
router.delete("/order/remove/:orderId/:userId",
    requireSignin, 
    isAuth,
    isWaiter, 
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