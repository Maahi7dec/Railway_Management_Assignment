const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trainId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {});

module.exports = Booking;
