const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles.js');

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
    image: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  }),
}), createArticle);

articlesRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().min(2),
  }).unknown(true),
}), deleteArticle);

articlesRouter.get('/', getArticles);

module.exports = articlesRouter;
