require('dotenv').config();

var express = require('express');
var path = require('path');
var logger = require('morgan');
const { handleError } = require('./lib/error')


var app = express();
// cargamos el conector a la base de datos
require('./lib/connectMongoose');


app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/apiv1/users', require('./routes/apiv1/users'));


app.use((err, req, res, next) => {
  if (err.array) { // validation error
    err.statusCode = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = { message: 'InvalidParameters', errors: err.mapped()};

  }
  handleError(err, res);
});


module.exports = app;
