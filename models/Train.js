const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Train = sequelize.define('Train', {
  source_station: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination_station: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available_seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Train;
