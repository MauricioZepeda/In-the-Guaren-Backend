const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
    role: {
        type: String,
        default: "WAITER",
        enum: ["WAITER", "ADMIN", "CASHIER"]  
    }, 
    enabled: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        const encriptado = this.encryptPassword(plainText);
        return encriptado === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) 
            return "";
        try {
            return crypto
                .createHmac('sha1', process.env.JWT_SECRET)
                .update(password)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);
