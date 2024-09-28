const sequelize = require('../config/database');
const { Booking, Train, User } = require('../models');


exports.bookSeat = async (req, res) => {
  console.log('Book seat endpoint reached');
  const { trainId, seatNumber } = req.body;
  const userId = req.user.id;

  const transaction = await sequelize.transaction();
  try {
    // Lock the Train record for updates
    const train = await Train.findOne({
      where: { id: trainId },
      lock: transaction.LOCK.UPDATE,
      transaction
    });

    
    const existingBooking = await Booking.findOne({
      where: {
        trainId,
        seat_number: seatNumber,
      },
      transaction
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

 
    if (train.available_seats <= 0) {
      return res.status(400).json({ message: 'No available seats' });
    }

    const booking = await Booking.create({
      seat_number: seatNumber,
      userId,
      trainId,
    }, { transaction });

    
    train.available_seats -= 1;
    await train.save({ transaction });

    await transaction.commit();
    res.json({ message: 'Seat booked successfully', booking });

  } catch (error) {
    console.error('Error while booking:', error);
    await transaction.rollback();
    res.status(500).json({ message: 'Error while booking', error });
  }
};


// Get booking details logic
exports.getBookingDetails = async (req, res) => {
  const userId = req.user.id;
  console.log(`Fetching booking details for user ID: ${userId}`);

  try {
    // Log the query details before executing it
    console.log('Querying bookings for user:', userId);
    
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Train, as: 'Train' }] // Use the correct alias here
    });

    // Log the fetched booking details
    console.log('Fetched bookings:', JSON.stringify(bookings, null, 2));

    res.json({ message: 'Booking details fetched successfully', bookings });

  } catch (error) {
    console.error('Error while fetching booking details:', error);
    res.status(500).json({ message: 'Error fetching booking details', error });
  }
};




