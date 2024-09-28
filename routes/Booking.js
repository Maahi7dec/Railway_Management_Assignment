const express = require('express');
const router = express.Router();
const { getBookingDetails, bookSeat } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth'); // Import the middleware

// Route to get user booking details
router.get('/my-bookings', authMiddleware, getBookingDetails);
router.post('/book-seat', authMiddleware, bookSeat); // Protect this route

module.exports = router;
