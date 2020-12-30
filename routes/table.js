const express = require("express");
const router = express.Router();

const { tableById,
        list,
        create,
        read,
        updateWaiter,
        updateAdmin,
        listAll,
        getAreasValues,
        openTable } = require("../controllers/table");
const { requireSignin, 
        isAuth, 
        isAdmin, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");
const { addTableValidator, 
        updateTableAdminValidator,
        updateTableWaiterValidator,
        listTablesByAreaValidator } = require("../validators/table");

// LIST TABLES
router.get("/tables", listTablesByAreaValidator, list);
 
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
    addTableValidator,
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
    updateTableWaiterValidator,
    updateWaiter
);

 // UPDATE TABLE ADMIN
router.put("/table/update/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateTableAdminValidator,
    updateAdmin
);
 
router.get("/tables/areas", getAreasValues);
 
router.put("/table/open/:tableId/:userId",
    requireSignin,
    isAuth,
    isWaiter,
    openTable
);
 
// params
router.param("tableId", tableById);
router.param("userId", userById);
 
module.exports = router;