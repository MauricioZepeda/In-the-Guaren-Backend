const express = require("express");
const router = express.Router();
 
const { requireSignin, isAuth, isWaiter, isCashier } = require("../controllers/auth")
const { billById, read, list, listAll, getPayMethodsValues,
        createForOneChair, getBillDetailForChair, 
        createForTable, getBillDetailForTable, 
        deletePreviousUnpayedBillForTable, deletePreviousUnpayedBillForChair } = require("../controllers/bill");
const { userById } = require("../controllers/user");
const { orderById } = require("../controllers/order");
const { getChair } = require("../controllers/chair");

router.get("/bills/paymethods/:userId", 
    requireSignin, 
    isAuth, 
    isCashier,     
    getPayMethodsValues
);

// LIST UNPAYED BILLS 
router.get("/bills/:userId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    list
);

// LIST ALL BILLS
router.get("/bills/all/:userId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    listAll
);

// ADD BILL FOR ONE CHAIR
router.post("/bill/chair/:orderId/:userId", 
    requireSignin, 
    isAuth, 
    isWaiter, 
    getChair,
    deletePreviousUnpayedBillForChair,
    getBillDetailForChair,
    createForOneChair
);

// ADD BILL FOR TABLE
router.post("/bill/table/:orderId/:userId", 
    requireSignin, 
    isAuth, 
    isWaiter, 
    deletePreviousUnpayedBillForTable,
    getBillDetailForTable,
    createForTable
);

// READ BILL
router.get("/bill/:billId", 
    requireSignin, 
    isAuth, 
    isCashier, 
    read
);

// // UPDATE BILL
// router.put("/bill/:billId/:userId",
//     requireSignin,
//     isAuth,
//     isCashier,
//     update
// );

 
// params
router.param("billId", billById);
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router; 