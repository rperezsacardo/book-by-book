'use strict';

const User = require('./../models/user');
const Joi = require('@hapi/joi');
// register Validation
const signUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string() //  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/), Se quisermos colocar uma senha especifica
      .min(6)
      .required(),
    repeat_password: Joi.ref('password')
  });

  const validation = schema.validate(data);
  return validation;
};

const signInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  });

  const validation = schema.validate(data);
  return validation;
};

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
