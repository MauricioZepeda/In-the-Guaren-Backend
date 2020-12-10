const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res
                .status(400)
                .json({error: errorHandler(err)});
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user});
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({
        email: email
    }, (err, user) => {
        if (err || !user) {
            return res
                .status(200)
                .json({error: "User with that email does not exist. Please signup"});
        }

        if (!user.authenticate(password)) {
            return res
                .status(200)
                .json({error: "E-mail and password do not match"});
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("t", token, {
            expire: new Date() + 1
        });

        const {_id, name, email, role} = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role
            }
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Signout success"});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, 
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res
            .status(401)
            .json({error: "Access denied..."});
    } 
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role !== "ADMIN") {
        return res
            .status(203)
            .json({error: "Admin resourse! Access denied..."});
    }
    next();
};

exports.isWaiter = (req, res, next) => {
    if (req.profile.role !== "WAITER") {
        return res
            .status(203)
            .json({error: "Waiter resourse! Access denied..."});
    }
    next();
};

exports.isCashier = (req, res, next) => {
    if (req.profile.role !== "CASHIER") {
        return res
            .status(203)
            .json({error: "Cashier resourse! Access denied..."});
    }
    next();
};
