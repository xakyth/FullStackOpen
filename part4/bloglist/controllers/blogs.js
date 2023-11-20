const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name']);
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const blog = await Blog.findById(id).populate('user', ['username', 'name']);
    response.status(200).json(blog);
  } catch (exception) {
    next();
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body;
  blog.likes = blog.likes || 0;
  if (!blog.title) {
    return response.status(400).json({ message: 'title cannot be empty' });
  }
  if (!blog.url) {
    return response.status(400).json({ message: 'url cannot be empty' });
  }

  const token = request.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(error);
  }
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blogObject = new Blog({
    ...request.body,
    user: user._id,
  });
  await blogObject.save();
  user.blogs = user.blogs.concat(blogObject._id);
  await user.save();

  const result = await blogObject.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  //TODO: delete blog's ref from User.blogs also
  const { id } = request.params;
  const token = request.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(error);
  }
  if (!decodedToken) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(204).end();
  }
  const user = await User.findById(decodedToken.id);
  if (user._id.toString() === blog.user.toString()) {
    try {
      await blog.deleteOne();
      response.status(204).end();
    } catch (error) {
      return next(error);
    }
  } else {
    response.status(403).json({ error: 'no access to delete the blog' });
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const blog = request.body;

  try {
    await Blog.findByIdAndUpdate(id, blog, { runValidators: true });
    response.status(200).json(blog);
  } catch (exception) {
    return next(exception);
  }
});

module.exports = blogsRouter;
