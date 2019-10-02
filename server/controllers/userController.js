const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const async = require('async');
const { body, validationResult, sanitizeBody } = require('express-validator');

const User = require('../models/user');

const TOKEN_LIFETIME = '3 days';
const SALT_LENGTH = 10;

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(401).json({
        message: 'This user was not found.',
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(err);
      }

      const noPassword = { _id: user._id, username: user.username };

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: TOKEN_LIFETIME });
      return res.json({ user: noPassword, token });
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
          return res.status(409).json({ errors: [{ msg: 'Username is already taken' }] });
        }
      }

      bcrypt.hash(req.body.password, SALT_LENGTH, (err, hashedPassword) => {
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

          const noPassword = {
            _id: newUser._id,
            username: newUser.username,
          };

          return res.status(201).json({ newUser: noPassword });
        });
      });
    });
  },
];

exports.updateUser = [
  body('newPassword', 'New password must be at least 8 characters').isLength({ min: 8 }).trim(),
  sanitizeBody('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    User.findById(userId, (err, theUser) => {
      if (err) {
        return next(err);
      }

      bcrypt.compare(req.body.oldPassword, theUser.password, (err, result) => {
        if (err) {
          return next(err);
        } else if (!result) {
          return res.status(400).json({ message: 'Old password is incorrect' });
        }

        bcrypt.hash(req.body.newPassword, SALT_LENGTH, (err, hashedPassword) => {
          if (err) {
            return next(err);
          }

          const updatedInfo = {
            password: hashedPassword,
          };

          User.findByIdAndUpdate(userId, updatedInfo, (err, updatedUser) => {
            if (err) {
              return next(err);
            }

            const updatedToken = jwt.sign(updatedUser.toJSON(),
              process.env.JWT_SECRET,
              { expiresIn: TOKEN_LIFETIME });

            return res.status(200).json({ token: updatedToken });
          });
        });
      });
    });
  },
];

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  User.findByIdAndDelete(userId, (err) => {
    if (err) {
      return next(err);
    }

    return res.sendStatus(200);
  });
};
