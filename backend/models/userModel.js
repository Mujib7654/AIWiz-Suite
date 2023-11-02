const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

//models
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is Required']
        },
        email: {
            type: String,
            required: [true, 'Email is Required']
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
            minlength: [6, 'Password length should be 6 character long']
        },
        customerID: {
            type: String,
            default: " "
        },
        subscription: {
            type: String,
            default: " "
        }
    }
);

//password hashing
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



const User = mongoose.model('User', userSchema);

module.exports = User;