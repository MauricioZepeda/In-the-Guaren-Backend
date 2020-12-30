exports.addTableValidator = (req, res, next) => {    
    validateAreaOptional(req);
    validateNumber(req);
    validateCapacity(req);
    validateStatusOptional(req);
    
    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

exports.updateTableAdminValidator = (req, res, next) => {    
    validateAreaOptional(req);
    validateNumber(req);
    validateStatusOptional(req);
    validateEnabled(req);
    validateDeleted(req);

    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

exports.updateTableWaiterValidator = (req, res, next) => {    
    validateAreaOptional(req);
    validateNumber(req);
    validateCapacity(req);

    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};

exports.listTablesByAreaValidator = (req, res, next) => {    
    validateArea(req); 

    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
}; 

const validateAreaOptional = req => (
    req.check('area')
        .trim()
        .optional()  
        .isIn(["Saloon", "Terrace", "Courtyard"])
        .withMessage('Area is not valid')
);

const validateNumber = req => (
    req.check('number', 'Table number must be a number') 
        .trim() 
        .isInt()
        .notEmpty()
);

const validateCapacity = req => (
    req.check('number', 'Capacity must be a number') 
        .isInt()
        .notEmpty()
);

const validateStatusOptional = req => (
    req.check('status')
        .trim()  
        .optional()
        .isIn(["Open", "Busy", "Closed"])
        .withMessage('Status is not valid') 
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