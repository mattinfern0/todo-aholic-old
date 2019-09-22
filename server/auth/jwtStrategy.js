const passport = require('passport');

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const mongoose = require('mongoose');
const User = require('../models/user');


const theStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, cb) => {
    User.findById({ id: mongoose.Types.ObjectId(jwtPayload._id) }, (user, err) => {
      if (err) {
        throw (err);
      }
      return cb(null, user);
    })
      .catch((err) => cb(err));
  },
);

passport.use(theStrategy);
