exports.addItemValidator = (req, res, next) => {    
    validateNumber(req); 
    
    const errors = req.validationErrors();  
    errors ? sendError(errors, res) : next(); 
};
  
const validateNumber = req => (
    req.check('number', 'Number must be a number') 
        .trim() 
        .isInt()
        .notEmpty()
);

const sendError = (errors, res) => {
    const firstError = errors.map(error => error.msg)[0];        
        return res
            .status(400)
            .json({error: firstError});
};