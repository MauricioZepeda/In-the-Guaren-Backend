const express = require("express");
const router = express.Router();

const {
    tableById,
    create,
    read,
    update,
    remove,
    list,
} = require("../controllers/table");
const { requireSignin, isAuth, isAdmin, isWaiter } = require("../controllers/auth"); 
const { userById } = require("../controllers/user");
 
router.get("/table/:tableId",
    requireSignin,
    isAuth, 
    read
);

router.post("/table/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    create
);

router.put(
    "/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.delete(
    "/table/:tableId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

router.get("/tables", list);
 
router.param("tableId", tableById);
router.param("userId", userById);
 
module.exports = router;