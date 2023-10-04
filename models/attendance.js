// models/attendance.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Import the User model if not already imported

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE, // Use DataTypes.DATE for date and time
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent'),
    allowNull: false,
    defaultValue : "absent"
  },
  // Add createdAt and updatedAt fields
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userID: {
    type: DataTypes.STRING, // Use the same data type as in the Users table
    allowNull: false,
    references: {
      model: 'Users', // The name of the referenced table
      key: 'userID', // The name of the referenced column in Users table
    },
  },
});
User.hasMany(Attendance,{foreignKey:"userID"});
Attendance.belongsTo(User, { foreignKey: 'userID' }); // Establishing a foreign key relationship

module.exports = Attendance;

