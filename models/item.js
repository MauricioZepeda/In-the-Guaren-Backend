const mongoose = require('mongoose');  
const { ObjectId } = mongoose.Schema; 
  
const itemSchema = new mongoose.Schema(
    {   
        product: { 
            type: ObjectId, 
            ref: "Product",
            required: true
        },  
        price: {
            type: Number,
            trim: true,
            required: true 
        },
        status: {
            type: String,
            default: "Ingresed",
            enum: ["Ingresed", "Ordered", "Returned", "Payed"]  
        },
        waiter: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        bill: {
            type: ObjectId,
            ref: "Bill", 
        }
    },
    { timestamps: true }
); 

module.exports = itemSchema;
