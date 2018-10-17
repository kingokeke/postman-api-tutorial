// app.js
var express = require('express');
var logger = require('morgan');
var err = require('./utils/err');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/haiku', require('./routes/haikuRoutes'));

app.use(err.handler);

module.exports = app;