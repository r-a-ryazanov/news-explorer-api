const usersRouter = require('express').Router();
const { getUser } = require('../controllers/users.js');

usersRouter.get('/me', getUser);

module.exports = usersRouter;
