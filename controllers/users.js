const User = require('../models/user');
// ---------------Контроллер получения информации о пользователе------------
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch((e) => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      if (e.name === 'CastError' && e.message !== 'Not Found') {
        err.message = 'Переданы некорректные данные';
        err.statusCode = 400;
      }
      next(err);
    });
};
