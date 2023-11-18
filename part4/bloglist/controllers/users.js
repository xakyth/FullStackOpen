const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = userRouter;
