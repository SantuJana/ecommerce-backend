const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        require: true,
    },
    phoneNo:{
        type: Number,
        require: false,
        unique: true,
    },
    profileImage:{
        type: String,
        require: false,
    },
},{timestamps: true,})

adminSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('admin', adminSchema)