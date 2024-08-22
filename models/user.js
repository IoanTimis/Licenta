const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Faculty = require('./faculty');
const Specialization = require('./specialization');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'student',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education_level: {
    type: DataTypes.ENUM('bsc', 'msc'),
    allowNull: false,
    defaultValue: 'bsc',
  },
  type: {
    type: DataTypes.ENUM('student', 'teacher', 'admin'),
    allowNull: false,
    defaultValue: 'student',
  },
  faculty_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Faculty,
      key: 'id',
    },
  },
  specialization_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Specialization,
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

Faculty.hasMany(User, { foreignKey: 'faculty_id', onDelete: 'CASCADE' });
User.belongsTo(Faculty, { foreignKey: 'faculty_id' });
Specialization.hasMany(User, { foreignKey: 'specialization_id', onDelete: 'CASCADE' });
User.belongsTo(Specialization, { foreignKey: 'specialization_id' });

module.exports = User;

