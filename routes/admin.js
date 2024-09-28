const express = require('express');
const Train = require('../models/Train');
require('dotenv').config();

const router = express.Router();

// Middleware to protect admin routes with API key
function verifyAdminAPIKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.ADMIN_API_KEY) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Invalid API key' });
}

// Add a new train (Admin only)
router.post('/add-train', verifyAdminAPIKey, async (req, res) => {
  const { source_station, destination_station, total_seats } = req.body;

  try {
    const newTrain = await Train.create({
      source_station,
      destination_station,
      total_seats,
      available_seats: total_seats
    });

    res.status(201).json({ message: 'Train added successfully', train: newTrain });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
