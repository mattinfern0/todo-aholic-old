const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        throw (err);
      }
      if (!user) {
        console.log('user not found');
        return cb(null, false, { message: 'Invalid credentials' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log('Error comparing hashed passwords');
          throw (err);
        }

        if (result) {
          return cb(null, user, { message: 'Successfully logged in' });
        } else {
          return cb(null, false, { message: 'Invalid credentials' });
        }
      });
    })
      .catch((err) => cb(err));
  },
));
