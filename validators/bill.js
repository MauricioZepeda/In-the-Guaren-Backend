exports.payBillValidator = (req, res, next) => {    
    validatePayMethod(req);
    validateTipOptional(req); 
    
    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};
 
const validatePayMethod = req => (
    req.check('payMethod')
        .trim() 
        .isIn(["Cash", "Debit", "Credit"])
        .withMessage('Pay method is not valid')
);

const validateTipOptional = req => (
    req.check('tip', 'Tip must be a number') 
        .trim() 
        .optional()
        .isInt()
        .notEmpty()
);

const sendError = (errors, res) => {
    const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
};