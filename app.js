const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/Booking');
const userRoutes = require('./routes/user');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/Bookings', bookingRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Railway Management System API');
});

// Sync Database and Start Server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // Use { force: true } for development to reset DB
  .then(() => {
    console.log('Database connected and synced.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
    
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
