const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialization = require('./specialization');
const Topic = require('./topic');

const SpecializationTopics = sequelize.define('specialization_topic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    specialization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Specialization,
            key: 'id',
        },
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Topic,
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

SpecializationTopics.belongsTo(Specialization, {foreignKey: 'specialization_id', onDelete: 'CASCADE'});
SpecializationTopics.belongsTo(Topic, {foreignKey: 'topic_id', onDelete: 'CASCADE'});

Specialization.belongsToMany(Topic, {through: SpecializationTopics, foreignKey: 'specialization_id'});
Topic.belongsToMany(Specialization, {through: SpecializationTopics, foreignKey: 'topic_id'});

Topic.hasMany(SpecializationTopics, {foreignKey: 'topic_id', onDelete: 'CASCADE'});
Specialization.hasMany(SpecializationTopics, {foreignKey: 'specialization_id', onDelete: 'CASCADE'});

module.exports = SpecializationTopics;
