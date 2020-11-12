const express = require('express');
const signupRouter = require('./signup.js');
const signinRouter = require('./signin.js');
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');
const auth = require('../middlewares/Auth.js');

const routers = express();
// ----------Роутинг для создания пользователя-------------------
routers.use('/signup', signupRouter);
// ----------Роутинг для входа-------------------
routers.use('/signin', signinRouter);

routers.use(auth);
// ----------Роутинг для пользователей-------------------
routers.use('/users', usersRouter);
// ----------Роутинг для статей-------------------
routers.use('/articles', articlesRouter);
module.exports = routers;
