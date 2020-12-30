"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error
            .message
            .substring(
                error.message.lastIndexOf(".$") + 2,
                error.message.lastIndexOf("_1")
            );
        output = fieldName
            .charAt(0)
            .toUpperCase() + fieldName.slice(1) + " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }

    return output;
};

/**
 * Get the error message from error object
 */
exports.errorHandler = (error, model='') => {
    let message = ""; 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                const errorMessage = uniqueMessage(error).split(':')[2].trim(); 
                message = errorMessage.charAt(0).toUpperCase() + errorMessage.substr(1).toLowerCase();   
                break;
            default:
                message = "Something went wrong";
        } 
    } else {
        if(error.kind === 'ObjectId'){
             message = `Something went wrong${ (model ? ` with ${model} id` : '') }`;
        }else{
            const errorDetail =  Object.values(error.errors)[0].properties;   
            if(errorDetail.type === 'enum' || errorDetail.type === 'required'){
                message = errorDetail.message 
            }else{
                message = 'Something went wrong!'; 
            } 
        }
    }
    return message;
};