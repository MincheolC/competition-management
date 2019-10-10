const mysql = require('mysql2');
const squel = require('squel').useFlavour('mysql');
const env = require('../utils/env');
const config = require('../config.json');
const logger = require('../logger');

let pool;

function getPool() {
    if (pool) {
        return pool;
    }

    const dbConfig = config[env.get()];
    const connectionLimit = 3;

    pool = mysql.createPool({
        host: dbConfig.host,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        connectionLimit,
        decimalNumbers: true,
    });

    return pool;
}

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

    const connection = conn || getPool();
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

module.exports = {
    paramQuery,
    paramQueryOne,
    queryBuilder: squel,
};
