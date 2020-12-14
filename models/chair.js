const mongoose = require('mongoose');  
const itemSchema = require('./item');

const chairSchema = new mongoose.Schema(
    { 
        number: {
            type: Number,
            trim: true,
            required: true 
        }, 
        items: [itemSchema]
    },
    { timestamps: true }
);
  
module.exports = chairSchema;