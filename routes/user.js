const express = require("express");
const router = express.Router();

// imports
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");
 
// SECRET ACCESS
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

// READ USER
router.get("/user/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    read
);

// UPDATE USER
router.put("/user/:userId", requireSignin, isAuth, isAdmin, update); 
 
// params
router.param("userId", userById);

module.exports = router;