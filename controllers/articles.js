const Article = require('../models/article.js');
// -----------------Контроллер добавления новой статьи---------
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.send({
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch((e) => {
      const err = new Error('Переданы некорректные данные');
      if (e.name === 'ValidationError') {
        err.statusCode = 400;
        next(err);
      }
    });
};
// -----------------Контроллер получения всех статей---------
module.exports.getArticles = (req, res, next) => {
  Article.find({}).select('+owner')
    .then((articles) => {
      const sendArticles = [];
      articles.forEach((item) => {
        if (item.owner == req.user._id) {
          sendArticles.push({
            _id: item._id,
            keyword: item.keyword,
            title: item.title,
            text: item.text,
            date: item.date,
            source: item.source,
            link: item.link,
            image: item.image,
          });
        }
      });
      res.send(sendArticles);
    })
    .catch((e) => {
      const err = new Error('Ошибка сервера');
      err.statusCode = 500;
      next(err);
    });
};
// ----------------Контроллер удаления статьи---------------
module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params._id).select('+owner')
    .orFail(new Error('Not Found'))
    .then((data) => {
      if (data) {
        if (req.user._id == data.owner._id) {
          Article.findByIdAndRemove(req.params._id)
            .then((article) => res.send({ data: article }));
        } else {
          const err = new Error('Запрещено удалять статьи других пользователей');
          err.statusCode = 403;
          next(err);
        }
      }
    })
    .catch((e) => {
      const err = new Error('Ошибка сервера');
      err.statusCode = 500;
      if (e.message === 'Not Found') {
        err.message = 'Статья не найдена';
        err.statusCode = 404;
      } else if (e.name === 'CastError') {
        err.message = 'Переданы некорректные данные';
        err.statusCode = 400;
      }
      next(err);
    });
};
