const express = require("express");
const router = express.Router();

const {
    tableById,
    list,
    create,
    read,
    updateWaiter,
    updateAdmin,
    listAll
} = require("../controllers/table");
const { requireSignin, 
        isAuth, 
        isAdmin, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");
 
// LIST TABLES
router.get("/tables", list);
 
router.get("/tables/all/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    listAll
);

// ADD TABLE
router.post("/table/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    create
);

// READ TABLE
router.get("/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    read
);

// UPDATE TABLE WAITER
router.put("/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    updateWaiter
);

 // UPDATE TABLE ADMIN
router.put("/table/update/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateAdmin
);
 
 
// params
router.param("tableId", tableById);
router.param("userId", userById);
 
module.exports = router;