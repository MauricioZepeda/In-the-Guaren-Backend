exports.signUpValidator = (req, res, next) => {    
    validateName(req);
    validateMail(req);
    validatePassword(req);

    const errors = req.validationErrors(); 
    if(errors){ 
        const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
    }
    next();
};

exports.signInValidator = (req, res, next) => {   
    validateMail(req);
    validatePassword(req);
    
    const errors = req.validationErrors(); 
    if(errors){ 
        const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
    }
    next();
};

const validateName = req => (
    req.check("name", "Name is required")
       .notEmpty()
)

const validateMail = req => (
    req
        .check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({min: 4, max: 32})
)

const validatePassword = req => (
    req
        .check("password", "Password is required")
        .notEmpty()  
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
)