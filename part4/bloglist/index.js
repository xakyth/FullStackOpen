const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);
require('dotenv').config();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
