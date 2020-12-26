const mongoose = require("mongoose"); 

const tableSchema = new mongoose.Schema(
    { 
        area: {
            type: String,
            default: "Saloon",
            enum: ["Saloon", "Terrace", "Courtyard"] 
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
            enum: ["Open", "Busy", "Closed"]  
        }, 
        enabled: {
            type: Boolean,
            default: true
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);