
const express = require('express');
const router = express.Router();
const DataEntry = require('../models/DataEntry');

// POST endpoint to receive and store data
router.post('/data', async (req, res) => {
  try {
    // Create a new data entry
    const newEntry = new DataEntry({
      message: req.body.message,
      timestamp: req.body.timestamp || new Date()
    });

    // Save to database
    const savedEntry = await newEntry.save();

    // Return success response
    res.status(201).json({
      success: true,
      id: savedEntry._id,
      message: 'Data stored successfully'
    });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({
      success: false,
      message: 'Error storing data',
      error: error.message
    });
  }
});

// GET endpoint to retrieve all data (for testing)
router.get('/data', async (req, res) => {
  try {
    const entries = await DataEntry.find().sort({ timestamp: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving data',
      error: error.message
    });
  }
});

module.exports = router;
