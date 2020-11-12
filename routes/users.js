const usersRouter = require('express').Router();
const { getUser } = require('../controllers/users.js');
const auth = require('../middlewares/Auth.js');

usersRouter.get('/', auth, getUser);

module.exports = usersRouter;
