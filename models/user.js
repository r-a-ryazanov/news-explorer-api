const mongoose = require('mongoose');
const valid = require('validator');
// const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return valid.isEmail(v);
      },
      message: 'Введите e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
/*
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Not found'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Not found'));
          }
          return user;
        });
    });
}; */
module.exports = mongoose.model('user', userSchema);
