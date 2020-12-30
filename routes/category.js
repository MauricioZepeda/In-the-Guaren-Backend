const express = require("express");
const router = express.Router();

// imports
const { categoryById, 
        list, 
        listAll, 
        create, 
        read, 
        update, 
        remove } = require("../controllers/category");
const { requireSignin, 
        isAuth, 
        isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { addCategoryValidator,  
        updateCategoryValidator} = require("../validators/category");
 
// LIST CATEGORIES
router.get("/categories", list);

router.get("/categories/all/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    listAll
);

// ADD CATEGORY
router.post("/category/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    addCategoryValidator,
    create
);

// READ CATEGORY
router.get("/category/:categoryId", read);

// UPDATE CATEGORY
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateCategoryValidator,
    update
);

// DELETE CATEGORY
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
 
// params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router; 