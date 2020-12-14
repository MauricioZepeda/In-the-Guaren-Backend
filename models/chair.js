const mongoose = require('mongoose');  
const { ObjectId } = mongoose.Schema; 

const chairSchema = new mongoose.Schema(
    { 
        number: {
            type: Number,
            trim: true,
            required: true 
        },   
        order: { 
            type: ObjectId, 
            ref: "Order",
            required: true
        } 
    },
    { timestamps: true }
);
  
module.exports = mongoose.model("Chair", chairSchema);