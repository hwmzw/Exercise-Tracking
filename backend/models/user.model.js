const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName: {type: String, required: [true, 'Please enter your name!']},
    lastName: {type: String, required: [true, 'Please enter your email!'], unique: true, lowercase: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true}
})

module.exports = mongoose.model("User", userScema)
