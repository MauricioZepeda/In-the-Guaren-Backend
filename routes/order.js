const express = require("express");
const router = express.Router();

const { orderById, read, remove } = require('../controllers/order');
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

router.param("orderId", orderById); 
router.param("userId", userById);

module.exports = router;