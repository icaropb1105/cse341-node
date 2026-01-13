const express = require('express');
require('dotenv').config();

const app = express(); 

const contactsRoutes = require('./routes/contacts');

app.use(express.json());
app.use('/contacts', contactsRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});
