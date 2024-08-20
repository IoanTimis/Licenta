const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 

const Topic = sequelize.define('topic', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('bsc', 'msc'),
    allowNull: false,
  },
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id',
    },
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

User.hasMany(Topic, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Topic.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Topic;
