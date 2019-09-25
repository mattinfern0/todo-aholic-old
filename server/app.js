/* eslint-disable import/order */
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
}));

const logger = require('morgan');
const mongoose = require('mongoose');

const apiRouter = require('./routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport strategy setup
require('./auth/localStrategy');
require('./auth/jwtStrategy');

// Router setup
app.use('/api', apiRouter);

// MongoDB setup
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
  res.json({
    message: 'Not found',
  });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  console.log('Random error:', err);
  res.status(err.status || 500);
  res.json({
    message: 'Something went wrong on the server',
  });
  next();
});

module.exports = app;
