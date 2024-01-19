const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');

userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false,
            minLength: 3,
        },
        lastName: {
            type: String,
            required: false,
            minLength: 3,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            minLength: 5,
        },
        phone: {
            type: Number,
            required: false,
            minLength: 10,
            maxLength: 10,
        },
        password: {
            type: String,
            required: true,
        },
        tokens: [{ token: String }],
    },
    { timesStamps: true }
);

userSchema.methods.signToken = async function(){
    let payload = {
        id: this._id,
        name: this.name,
        email: this.email,
    }
    const token = await jwt.sign(payload, secret);
    return token
}

userSchema.methods.verifyToken = async function(token){
    const payload = await jwt.verify(token, secret);
    return payload;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(this.password, salt);
    this.password = encryptedPassword;
})

module.exports = mongoose.model("User", userSchema);
