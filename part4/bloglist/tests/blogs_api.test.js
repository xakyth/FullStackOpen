const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./blogs_api_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

describe('initially some blogs saved', () => {
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

  describe('addition of a blog', () => {
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

    test('create blog without likes specified', async () => {
      const newBlog = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      };

      const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect(postResponse.body.likes).toEqual(0);
    });

    test('creation of blog without title or url will return 400 Bad Request', async () => {
      const blogWithoutTitle = {
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      };
      let postRequest = await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400);
      expect(postRequest.body.message).toEqual('title cannot be empty');
      const blogWithoutUrl = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
      };

      postRequest = await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400);
      expect(postRequest.body.message).toEqual('url cannot be empty');

      const blogWithoutTitleAndUrl = {
        author: 'Matti Luukkainen',
      };
      postRequest = await api
        .post('/api/blogs')
        .send(blogWithoutTitleAndUrl)
        .expect(400);
    });
  });
  describe('deletion of a blog', () => {
    test('blog can be deleted when accessed by id', async () => {
      let getResponse = await api.get('/api/blogs');
      const blogsAtStart = getResponse.body;

      const blogToDelete = blogsAtStart[0];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      getResponse = await api.get('/api/blogs');
      const blogsAtEnd = getResponse.body;
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const urls = blogsAtEnd.map((b) => b.url);
      expect(urls).not.toContain(blogToDelete.url);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
