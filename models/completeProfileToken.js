const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');


const CompleteProfileToken = sequelize.define('completeProfileTokens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasOne(CompleteProfileToken, { foreignKey: 'user_id' , onDelete: 'CASCADE' });
CompleteProfileToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = CompleteProfileToken;