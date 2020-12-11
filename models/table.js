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
            required: true,
            unique: true
        },          
        capacity: {
            type: Number,
            trim: true,
            required: true,
            default: 4
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