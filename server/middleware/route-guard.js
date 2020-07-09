'use strict';
const jwt = require('jsonwebtoken');

// Route Guard Middleware
// This piece of middleware is going to check if a user is authenticated
// If not, it sends the request to the app error handler with a message
module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
};

// Check if there is a token at headers
const routeGuardJwt = (req, res, next) => {
  const token = req.header('accessToken');
  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (verified) {
    req.user = verified;
    next();
  } else {
    const error = new Error('Invalid token');
    error.status = 401;
    next(error);
  }
};
module.exports.routeGuardJwt = routeGuardJwt;

// Work in progress >>>>>>>>>>>

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // first check if ther is a Header then bearer TOKEN take the secont paremeter
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}