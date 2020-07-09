'use strict';

/*

*/
require('dotenv').config();
//Npm
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Models
const User = require('./../models/user');

// Middlewares

const { signInValidation, signUpValidation } = require('../middleware/validation');
const { routeGuardJwt } = require('../middleware/route-guard');

const router = new Router();

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = signUpValidation(req.body);
  console.log(error);

  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email })
    .then((document) => {
      if (document) return Promise.reject(new Error('This email already resgister'));
    })
    .catch((error) => next(error));
  return bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then((user) => {
      //req.session.user = user._id;
      res.json({ message: 'User Created' });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;

  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10m'
        });
        // const refreshToken = jwt.sign(user.name, process.env.REFRESH_TOKEN_SECRET);
        // return res.json({ accessToken });
        return res.header('accessToken', accessToken).json({ message: 'Sign in', accessToken });
      } else {
        //return res.status(400).send('Email or >> password wrong');
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

// router.post('/token', (req, res, next) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   //Check at db if there is this refresh Token
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     //const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });

router.get('/me', (req, res, next) => {
  let userId;
  let userDocument;
  const cryptId = req.headers.accesstoken;
  const dCryptId = jwt.verify(cryptId, process.env.ACCESS_TOKEN_SECRET, (error, result) => {
    if (error) return next(error);
    userId = result;
  });

  User.findById(userId)
    .then((result) => {
      // console.log('result', result);
      userDocument = result;
      return res.json({
        user: { email: result.email, id: result._id } || null
      });
    })
    .catch((error) => next(error));
});

router.post('/sign-out', (req, res) => {
  console.log(req.headers.accesstoken);
  req.headers.accesstoken = null;
  console.log(req.headers.accesstoken);
  // req.user.destroy();
  res.send(req.headers.accesstoken);
});

router.get('/test', routeGuardJwt, (req, res) => {
  console.log('test');
  res.json({ post: 'test route guard' });
});

module.exports = router;
