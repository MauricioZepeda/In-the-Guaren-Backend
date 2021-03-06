const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true 
        },
        description: {
            type: String,
            trim: true 
        },
        price: {
            type: Number,
            trim: true,
            required: true 
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        enabled: {
            type: Boolean,
            default: true
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);