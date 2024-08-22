const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialization = require('./specialization');
const Topic = require('./topic');

const SpecializationTopic = sequelize.define('specializations_topics', {
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

SpecializationTopic.belongsTo(Specialization, {foreignKey: 'specialization_id', onDelete: 'CASCADE'});
SpecializationTopic.belongsTo(Topic, {foreignKey: 'topic_id', onDelete: 'CASCADE'});

Specialization.belongsToMany(Topic, {through: SpecializationTopic, foreignKey: 'specialization_id'});
Topic.belongsToMany(Specialization, {through: SpecializationTopic, foreignKey: 'topic_id'});

Topic.hasMany(SpecializationTopic, {foreignKey: 'topic_id', onDelete: 'CASCADE'});
Specialization.hasMany(SpecializationTopic, {foreignKey: 'specialization_id', onDelete: 'CASCADE'});

module.exports = SpecializationTopic;
