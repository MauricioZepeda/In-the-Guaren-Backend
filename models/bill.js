const mongoose = require('mongoose');   
const { ObjectId } = mongoose.Schema; 
 
/**
* @swagger
* definitions:
*  Order:
*    type: "object"
*    properties:
*      id:
*        type: "integer"
*        format: "int64"
*      petId:
*        type: "integer"
*        format: "int64"
*      quantity:
*        type: "integer"
*        format: "int32"
*      shipDate:
*        type: "string"
*        format: "date-time"
*      status:
*        type: "string"
*        description: "Order Status"
*        enum:
*        - "placed"
*        - "approved"
*        - "delivered"
*      complete:
*        type: "boolean"
*        default: false
*    xml:
*      name: "Order"
*/   
const billSchema = new mongoose.Schema(
    { 
        type: {
            type: String, 
            enum: ["Chair", "Table"],
            require: true
        },
        number: {
            type: Number,
            require: true,
            trim: true 
        }, 
        order: {
            type: ObjectId,
            ref: "Order" 
        },
        detail: {
            type: Array,
            default: []
        },
        total: {
            type: Number,
            trim: true 
        }, 
        tip: {
            type: Number, 
            trim: true
        }, 
        payMethod: {
            type: String, 
            enum: ["Cash", "Debit", "Credit"]  
        },
        status: {
            type: String,
            default: "Unpaid",
            enum: ["Unpaid", "Payed"]  
        },
        cashier: {
            type: ObjectId,
            ref: "User" 
        }
    },
    { timestamps: true }
);
   

module.exports = mongoose.model("Bill", billSchema);