const signinRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/signin.js');

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^\S*$/).required().min(8),
  }),
}), login);

module.exports = signinRouter;
