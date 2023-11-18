const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    let validationError = new mongoose.Error.ValidationError(null);
    validationError.addError('password', new mongoose.Error.ValidatorError({ message: 'should contain at least 3 characters' }));
    return next(validationError);
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  const userObject = new User({
    username,
    name,
    passwordHash,
  });
  try {
    await userObject.save();
    response.status(201).json(userObject);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
