const Booking = require('./booking');
const Train = require('./Train');
const User = require('./User');


Train.hasMany(Booking, { foreignKey: 'trainId' });
Booking.belongsTo(Train, { foreignKey: 'trainId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

console.log('Booking associations:', Booking.associations); 
console.log('Train associations:', Train.associations); 
module.exports = {
    User,
    Train,
    Booking
};
