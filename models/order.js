const mongoose = require('mongoose');  
const { ObjectId } = mongoose.Schema; 

const orderSchema = new mongoose.Schema(
    {    
        table: { 
            type: ObjectId, 
            ref: "Table",
            required: true
        },
        closed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
  
module.exports = mongoose.model("Order", orderSchema);