const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/Booking');
const userRoutes = require('./routes/user');

const app = express();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/Bookings', bookingRoutes);


app.get('/', (req, res) => {
  res.send('Railway Management System API');
});


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
