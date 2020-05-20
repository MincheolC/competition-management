const { Sequelize, DataTypes, Model } = require('sequelize');
const env = require('../utils/env');
const config = require('../config.json');

const {
    username, database, host, password,
} = config[env.get()];

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        freezeTableName: true,
    },
});

module.exports = {
    sequelize,
    DataTypes,
    Model,
};
