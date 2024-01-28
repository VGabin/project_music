const express = require('express');
const server = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  // Paths to files containing OpenAPI annotations
  apis: ['./api/routes/*.js'],
};

const swaggerSpecification = swaggerJsdoc(options);

const hostname = "0.0.0.0";
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

server.use(express.urlencoded());
server.use(express.json());
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

const voteRoute = require('./api/routes/voteRoute');
voteRoute(server);
const musicRoute = require('./api/routes/musicRoute');
musicRoute(server);
const sessionRoute = require('./api/routes/sessionRoute');
sessionRoute(server);
const userRoute = require('./api/routes/userRoute');
userRoute(server);

server.listen(port, hostname);