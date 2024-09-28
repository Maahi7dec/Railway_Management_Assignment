const express = require('express');
const Train = require('../models/Train');

const router = express.Router();

// Get train availability between two stations
router.get('/seat-availability', async (req, res) => {
  const { source_station, destination_station } = req.query;

  try {
    const trains = await Train.findAll({
      where: {
        source_station,
        destination_station
      }
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains available between these stations' });
    }

    res.json({ trains });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
