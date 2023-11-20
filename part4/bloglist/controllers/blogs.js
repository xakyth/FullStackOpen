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

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;
  blog.likes = blog.likes || 0;
  if (!blog.title) {
    return response.status(400).json({ message: 'title cannot be empty' });
  }
  if (!blog.url) {
    return response.status(400).json({ message: 'url cannot be empty' });
  }

  //TODO : this is code for dev, replace via real creator, not random
  const usersQuery = await User.find({});
  const users = usersQuery.map((user) => user.toJSON());
  const blogCreatorIndex = Math.round(Math.random() * (users.length-1));
  const blogObject = new Blog({
    ...request.body,
    user: users[blogCreatorIndex].id,
  });
  await blogObject.save();
  const userObject = await User.findByIdAndUpdate(
    users[blogCreatorIndex].id,
    {
      ...users[blogCreatorIndex],
      blogs: users[blogCreatorIndex].blogs.concat(blogObject._id),
    }, 
    {
      runValidators: true,
      strictQuery: true,
    }
  )
  console.log('userObject', userObject);
  
  const result = await blogObject.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  //TODO: delete blog's ref from User.blogs also
  const { id } = request.params;
  try {
    await Blog.findByIdAndDelete(id);
  } catch (exception) {
    return next(exception);
  }
  response.status(204).end();
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
