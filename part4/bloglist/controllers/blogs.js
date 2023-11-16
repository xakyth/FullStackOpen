const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;
  blog.likes = blog.likes || 0;
  if (!blog.title) {
    return response.status(400).json({ message: 'title cannot be empty' });
  }
  if (!blog.url) {
    return response.status(400).json({ message: 'url cannot be empty' });
  }

  const blogObject = new Blog(request.body);

  const result = await blogObject.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndDelete(id);
  } catch (exception) {
    return next(exception);
  }
  response.status(204).end();
});

module.exports = blogsRouter;
