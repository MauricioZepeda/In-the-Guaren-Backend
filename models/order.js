const mongoose = require('mongoose');  
const chairSchema = require('./chair'); 
const { ObjectId } = mongoose.Schema; 

const orderSchema = new mongoose.Schema(
    {    
        table: { 
            type: ObjectId, 
            ref: "Table",
            required: true
        },
        chairs: [chairSchema], 
        closed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
  
module.exports = mongoose.model("Order", orderSchema);