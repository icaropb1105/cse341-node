const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 8080;

app.use(express.json());

/* Swagger definition */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/* Swagger route */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Routes */
app.use('/contacts', require('./routes/contacts'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`DB connected and server running on port ${port}`);
    });
  }
});
