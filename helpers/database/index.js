const { Sequelize, DataTypes, Model } = require('sequelize');
const env = require('../utils/env');
const config = require('../config.json');
const logger = require('../logger');
const { assertNotNull } = require('../assert');

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

sequelize
    .authenticate()
    .then(() => {
        logger.info('Connection has been established successfully.');
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });

function checkMultiRows(rows, queryString) {
    const isSingleRow = rows.length < 2;

    if (isSingleRow) {
        return null;
    }

    const message = `More than one row found: ${queryString}`;
    logger.error(message);
    return message;
}

function paramQueryTransaction(queryObject, conn, callback) {
    const { text, values } = queryObject.toParam();
    logger.debug(text, values);

    const connection = conn || sequelize;
    connection.query(text, values, (error, results /* ignore other params */) => {
        if (error) {
            if (!conn) {
                return callback(error);
            }
            return conn.rollback(() => callback(error));
        }
        return callback(null, results);
    });
}

function paramQuery(queryObject, callback) {
    paramQueryTransaction(queryObject, null, callback);
}

function paramQueryOne(queryObject, callback) {
    paramQuery(queryObject, (error, rows) => {
        if (error) {
            return callback(error);
        }
        checkMultiRows(rows, queryObject.toString());
        return callback(null, rows[0]);
    });
}

function setOrNot(queryObject, name, value, allowNull = true) {
    assertNotNull(queryObject, 'queryObject');
    assertNotNull(name, 'name');

    if (value !== undefined && (allowNull || value !== null)) {
        queryObject.set(name, value);
    }
}

module.exports = {
    paramQuery,
    paramQueryOne,
    setOrNot,
    sequelize,
    DataTypes,
    Model,
};
