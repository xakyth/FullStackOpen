const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./blogs_api_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = testHelper.initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

test('get all blogs in json format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(testHelper.initialBlogs.length);
});

test('unique identifier is "id"', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((b) => {
    expect(b.id).toBeDefined();
  });
});

test('successfull creation of a new blog', async () => {
  const newBlog = {
    title: 'Testing the backend',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const getResponse = await api.get('/api/blogs');
  expect(getResponse.body).toHaveLength(testHelper.initialBlogs.length + 1);
  const urls = getResponse.body.map((b) => b.url);
  expect(urls).toContain(newBlog.url);
});
