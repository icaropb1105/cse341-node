const express = require('express');
const router = express.Router();
const connectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

/* GET ALL contacts */
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET contact by ID */
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
