const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({username: username});

  if (!(user && await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).json({error: 'wrong username or password'});
  }
  //console.log('user.passwordHash', user.passwordHash)
  //await bcrypt.compare(password, user.passwordHash);

  response.status(210).json({token: "token", username, password});
});

module.exports = loginRouter;
