const express = require("express");
const router = express.Router();

// imports
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
 
// LIST PRODUCTS
router.get("/products", list);

// ADD PRODUCT
router.post("/product/create/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    create
);

// READ PRODUCT
router.get("/product/:productId", read);
 
// UPDATE PRODUCT
router.put("/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

// DELETE PRODUCT
router.delete("/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

 

router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
 
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;