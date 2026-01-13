const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const connectDB = async () => {
  if (database) {
    return database;
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();
  database = client.db();

  console.log('MongoDB connected');

  return database;
};

module.exports = connectDB;
