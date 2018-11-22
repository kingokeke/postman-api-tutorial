// app.js
const express = require('express');
const logger = require('morgan');
const err = require('./utils/err');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/haiku', require('./routes/haikuRoutes'));

app.use(err.handler);

module.exports = app;