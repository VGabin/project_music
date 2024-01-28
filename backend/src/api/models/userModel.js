const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;