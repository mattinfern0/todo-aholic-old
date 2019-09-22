const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const theStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, cb) => {
    User.findOne({ username, password }, (err, user) => {
      if (err) {
        throw (err);
      }
      if (!user) {
        return cb(null, false, { message: 'Invalid credentials' });
      }

      return cb(null, user, { message: 'Successfully logged in' });
    })
      .catch((err) => cb(err));
  },
);

passport.use(theStrategy);
