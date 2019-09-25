const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../models/user'); // For testing purposes


function notImplemented(res) {
  return res.json({ message: 'Not implemented' });
}


function createMockUser() {
  const mockName = 'Leeroy Jenkins';
  const mockPassword = '12345';

  bcrypt.hash(mockPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.log('Error hashing mock passwd');
      return;
    }
    const mockUser = new User(
      {
        username: mockName,
        password: hashedPassword,
      },
    );
  
    mockUser.save((err) => {
      if (err) {
        console.log("Error creating mock user: ", err);
      }
    });
  });
}

// createMockUser();

exports.loginUser = (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message: 'A weird error occured...',
        user,
      });
    } else if (!user) {
      console.log("User was not found");
      return res.status(404).json({
        message: 'This user was not found.',
        user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log('Error while loggin in: ', err);
        res.send(err);
      }

      // Send user's id only for security purposes
      const idOnly = { _id: user._id };

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user: idOnly, token });
    });
  })(req, res, next);
};

// eslint-disable-next-line arrow-body-style
exports.createUser = [
  body('username', 'Username must be at least 5 characters').isLength({ min: 1 }).trim(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }).trim(),

  sanitizeBody('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors) {
      return res.status(401).json({ errors });
    }

    async.waterfall([
      (callback) => {
        User.findOne({ username: req.body.username }, callback);
      },
      (err, user, callback) => {
        if (user) {
          callback(new Error('User already exists'));
        }
      },
    ], (err) => {
      if (err.message === 'User already exists') {
        return res.status(409).json({ message: 'Username is already taken' });
      }  

      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      newUser.save((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error while saving new user in db' });
        }

        return res.status(201).json({ newUser });
      });
    });
  },

];

// eslint-disable-next-line arrow-body-style
exports.logoutUser = (req, res, next) => {
  return notImplemented(res);
};
