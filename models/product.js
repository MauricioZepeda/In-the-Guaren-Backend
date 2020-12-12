const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            trim: true, 
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);