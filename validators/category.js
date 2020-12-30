exports.addCategoryValidator = (req, res, next) => {    
    validateName(req);
    validateEnabled(req);
    validateDeleted(req); 
    
    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

exports.updateCategoryValidator = (req, res, next) => {    
    validateNameOptional(req);
    validateEnabled(req);
    validateDeleted(req); 
    
    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

const validateName = (req) => (
    req.check("name", "Name is required")
        .trim()
        .isLength({max: 32})
       .notEmpty()
);

const validateNameOptional = (req) => (
    req.check("name", "Name is required")
        .trim()
        .isLength({max: 32})
       .notEmpty() 
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
        .withMessage('Enabled must be a boolean true or false') 
);
 
const sendError = (errors, res) => {
    const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
};