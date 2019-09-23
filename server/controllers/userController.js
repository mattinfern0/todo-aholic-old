const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
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
exports.createUser = (req, res, next) => {
  return notImplemented(res);
};

// eslint-disable-next-line arrow-body-style
exports.logoutUser = (req, res, next) => {
  return notImplemented(res);
};
