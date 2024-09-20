const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const topic = require('./topic');

const topicRequest = sequelize.define('topic_requests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teacher_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  student_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  student_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'topics',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
 }
});

User.hasMany(topicRequest, {foreignKey: 'teacher_id', onDelete: 'CASCADE', as: 'teacher'});
User.hasMany(topicRequest, {foreignKey: 'student_id', onDelete: 'CASCADE', as: 'student'});
topic.hasMany(topicRequest, {foreignKey: 'topic_id', onDelete: 'CASCADE' , as: 'topic'});
topicRequest.belongsTo(User, {foreignKey: 'teacher_id', as: 'teacher'});
topicRequest.belongsTo(User, {foreignKey: 'student_id', as: 'student'});
topicRequest.belongsTo(topic, {foreignKey: 'topic_id', as: 'topic'});


module.exports = topicRequest;

