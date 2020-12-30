const express = require("express");
const router = express.Router();

// imports
const { requireSignin, 
        isAuth, 
        isAdmin } = require("../controllers/auth");
const { userById, 
        read, 
        update, 
        list, 
        getRolesValues } = require("../controllers/user");
const { updateuserValidator} = require("../validators/auth");

// SECRET ACCESS
router.get("/secret/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    (req, res) => {
        res.json({
            user: req.profile
        });
    }
);

router.get("/users/:userId",    
    requireSignin, 
    isAuth, 
    isAdmin, 
    list
);

// READ USER
router.get("/user/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    read
);

// UPDATE USER
router.put("/user/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    updateuserValidator,
    update
); 
 
router.get("/users/roles/:userId", 
    requireSignin, 
    isAuth, 
    isAdmin, 
    getRolesValues
);

// params
router.param("userId", userById);

module.exports = router;