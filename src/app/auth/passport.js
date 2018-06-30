// @flow
'use strict';

import passport from 'passport';
import passwordHash from 'password-hash';
import { Strategy as LocalStrategy }from 'passport-local';
import passportJWT from 'passport-jwt';

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

type args = {
  User: any
};

// Todo
// 1. We need to store token somewhere
// 2. We need to check if token if it's stored or not while authenticating
// 3. We need to destroy saved tokens on logout
// 4. We need to delete all tokens on password reset

export default (models: args) => {
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, cb) {
    return models.User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          return cb(null, false, {error: 'User already exists.'});
        }

        return models.User.sync();
      })
      .then(() => {
        password = passwordHash.generate(password);
        return models.User.create({ email, password });
      })
      .then(() => {
        return models.User.findOne({ where: { email } });
      })
      .then((user) => {
        return cb(null, user.dataValues);
      })
      .catch(err => cb(err));
  }));

  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function (email, password, cb) {
      return models.User.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return cb(null, false, {error: 'User does not exist.'});
          }

          if(passwordHash.verify(password, user.dataValues.password)) {
            return cb(null, user.dataValues);
          } else {
            return cb(null, false, {error: 'Invalid Password.'});
          }
        })
        .catch(err => cb(err));
  }));

  passport.use('auth-check', new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
      return models.User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  ));
};


