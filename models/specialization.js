const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Faculty = require('./faculty');

const Specialization = sequelize.define('specializations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  faculty_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Faculty,
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

Faculty.hasMany(Specialization, { foreignKey: 'faculty_id', onDelete : 'CASCADE' });
Specialization.belongsTo(Faculty, { as: 'faculty', foreignKey: 'faculty_id' });

module.exports = Specialization;