'use strict';

const mongoose = require('mongoose');
const validator = require('validator')

const { ErrorHandler } = require('../lib/error')

// primero creamos el esquema
const colchonSchema = mongoose.Schema({

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
const Colchon = mongoose.model('Colchon', colchonSchema);

// y lo exportamos
module.exports = Colchon;