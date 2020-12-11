const express = require("express");
const router = express.Router();

const {
    tableById,
    list,
    create,
    read,
    update,
    remove,
} = require("../controllers/table");
const { requireSignin, 
        isAuth, 
        isAdmin, 
        isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");
 
// LIST TABLES
router.get("/tables", list);
 
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

// UPDATE TABLE
router.put(
    "/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

// DELETE TABLE
router.delete(
    "/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);


 
// params
router.param("tableId", tableById);
router.param("userId", userById);
 
module.exports = router;