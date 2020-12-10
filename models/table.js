const mongoose = require("mongoose"); 

const tableSchema = new mongoose.Schema(
    { 
        area: {
            type: String,
            trim: true,
            required: true,
            maxlength: 20
        },
        number: {
            type: Number,
            trim: true,
            required: true 
        },          
        capacity: {
            type: Number,
            trim: true,
            required: true 
        }, 
        status: {
            type: String,
            default: "Open",
            enum: ["Open", "Busy", "Closed", "Disabled"]  
        } 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);