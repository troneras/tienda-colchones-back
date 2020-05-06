'use strict';

const mongoose = require('mongoose');
const validator = require('validator')

const { ErrorHandler } = require('../lib/error')

// primero creamos el esquema
const somierSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true        
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
        required: true
    },
});




// y por último creamos el modelo
const Somier = mongoose.model('Somier', somierSchema);

// y lo exportamos
module.exports = Somier;