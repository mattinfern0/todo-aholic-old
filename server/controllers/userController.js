const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const async = require('async');
const { body, validationResult, sanitizeBody } = require('express-validator');

const User = require('../models/user');

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    } else if (!user) {
      console.log("User was not found");
      return res.status(404).json({
        message: 'This user was not found.',
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(err);
      }

      // Send user's id only for security purposes
      const idOnly = { _id: user._id };

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '3 days' });
      return res.json({ user: idOnly, token });
    });
  })(req, res, next);
};

exports.createUser = [
  body('username', 'Username must be at least 5 characters').isLength({ min: 5 }).trim(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }).trim(),

  sanitizeBody('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('There were errors in request');
      return res.status(400).json(errors);
    }

    async.waterfall([
      (callback) => {
        User.findOne({ username: req.body.username }, callback);
      },
      (user, callback) => {
        if (user) {
          return callback(new Error('User already exists'));
        }
        callback();
      },
    ], (err) => {
      if (err) {
        if (err.message === 'User already exists') {
          console.log('User already exists');
          return res.status(409).json({ errors: [{ msg: 'Username is already taken' }] });
        }
      }

      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        newUser.save((err) => {
          if (err) {
            console.log('Error saving new user');
            next(err);
          }

          console.log('Successfuly created new user');
          return res.status(201).json({ newUser });
        });
      });
    });
  },
];
