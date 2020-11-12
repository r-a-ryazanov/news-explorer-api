const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles.js');
const auth = require('../middlewares/Auth');

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/^(https?\:\/\/)(www\.)?[a-z0-9]{1}[-\.\/a-z0-9-]*\.[a-z0-9]{1}[-\/a-z0-9-]*#?$/),
    image: Joi.string().required().pattern(/^(https?\:\/\/)(www\.)?[a-z0-9]{1}[-\.\/a-z0-9-]*\.[a-z0-9]{1}[-\/a-z0-9-]*#?$/),
  }),
}), auth, createArticle);

articlesRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().min(2),
  }).unknown(true),
}), auth, deleteArticle);

articlesRouter.get('/', auth, getArticles);

module.exports = articlesRouter;
