exports.signUpValidator = (req, res, next) => {    
    validateName(req);
    validateEmail(req);
    validateRole(req); 
    validatePassword(req);

    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

exports.signInValidator = (req, res, next) => {   
    validateEmail(req);
    validatePassword(req);
    
    const errors = req.validationErrors(); 
    errors ? sendError(errors, res) : next(); 
};

exports.updateuserValidator = (req, res, next) => {   
    validateNameOptional(req);
    validateEmailOptional(req);
    validatePasswordOptional(req);
    validateRole(req); 
    validateEnabled(req);
    validateDeleted(req);
    
    const errors = req.validationErrors(); 
    errors ? sendError(errors, res) : next(); 
};

const validateName = (req) => (
    req.check("name", "Name is required")
       .notEmpty()
);

const validateNameOptional = (req) => (
    req.check("name", "Name is required") 
        .notEmpty()
        .optional()
);

const validateEmail = req => (
    req.check("email", "Email must be between 3 to 32 characters")
        .trim()  
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({min: 4, max: 32})
        .notEmpty()
);

const validateEmailOptional = req => (
    req.check("email", "Email must be between 3 to 32 characters")
        .trim()  
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({min: 4, max: 32})
        .optional()
);

const validatePassword = req => (
    req.check("password", "Password is required")
        .trim()  
        .notEmpty()  
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number") 
);

const validatePasswordOptional = req => (
    req.check("password", "Password is required")
        .trim()  
        .notEmpty()  
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .optional()
);

const validateRole = req => (
    req.check('role')
        .trim()   
        .isIn( ["WAITER", "ADMIN", "CASHIER"] )
        .withMessage('Role is not valid') 
        .optional()
);
  
const validateEnabled = req => (
    req.check('enabled')
        .optional()
        .trim()  
        .isBoolean() 
        .withMessage('Enabled must be a boolean true or false') 
);

const validateDeleted = req => (
    req.check('deleted')
        .optional()
        .trim()  
        .isBoolean() 
        .withMessage('Deleted must be a boolean true or false') 
);

const sendError = (errors, res) => {
    const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
};