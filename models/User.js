'use strict';

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../lib/error')

// primero creamos el esquema
const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new ErrorHandler(404, { error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    recovery_token: {
        type: String,
        required: false

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.generateRecoveryToken = async function () {
    // Generate an auth token for the user
    const user = this
    user.recovery_token = jwt.sign({ _id: user._id }, process.env.JWT_KEY) 
    await user.save()
    
    return user.recovery_token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new ErrorHandler(404, 'No user found with this email' )
    }    
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new ErrorHandler(404, 'Invalid login credentials' )
    }
    
    return user
}


// y por último creamos el modelo
const User = mongoose.model('User', userSchema);

// y lo exportamos
module.exports = User;