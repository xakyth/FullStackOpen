const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return response.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return response.status(401).json({ error: error.message });
    default:
      break;
  }

  next(error);
};

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = { errorHandler, unknownEndPoint, requestLogger };
