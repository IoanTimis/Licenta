const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 
const Specialization = require('./specialization');

const Topic = sequelize.define('topics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  education_level: {
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
