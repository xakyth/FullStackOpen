const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

const app = express();

mongoose.set('strictQuery', false);
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);
logger.info('connecting to MongoDB');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
