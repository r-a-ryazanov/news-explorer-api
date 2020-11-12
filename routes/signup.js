const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/signup.js');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^\S*$/).required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = signupRouter;
