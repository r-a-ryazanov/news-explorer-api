const bcrypt = require('bcryptjs');
const User = require('../models/user');
// -----------------Контроллер добавления нового пользователя---------
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: { _id: user._id, email: user.email } }))
    .catch((e) => {
      const err = new Error('Переданы некорректные данные');
      err.statusCode = 400;
      if (e.name === 'MongoError' && e.code === 11000) {
        err.message = 'Пользователь существует';
        err.statusCode = 409;
      }
      next(err);
    });
};
