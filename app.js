require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routers = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/Logger.js');

const { PORT = 3000, BD_NAME = 'newsdb' } = process.env;
const app = express();

mongoose.connect(`mongodb://localhost:27017/${BD_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', routers);
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.all('/*', (req, res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = 404;
  next(err);
});
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log();
});
