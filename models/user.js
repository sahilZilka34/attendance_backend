// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define('User', {
  userID: {
    type: DataTypes.STRING,
    unique: true, // Generates a random UUID for each new user
    primaryKey: true,
    allowNull :false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false
  },
  role : {
    type : DataTypes.ENUM("user","admin"),
    allowNull : false,
    defaultValue : "user",
  }
  // Add other user-related fields as needed (e.g., name, email, etc.)
});



User.prototype.comparePassword = async function(enteredPassword){
    try {
        return await bcrypt.compare(enteredPassword, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = User;
