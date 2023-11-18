const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const userObject = new User({
    username,
    name,
    passwordHash,
  });
  await userObject.save();
  response.status(201).json(userObject);
});

module.exports = userRouter;
