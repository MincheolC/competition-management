const logger = require('../logger');

function invalidParam(res, paramName) {
    return res.status(400).send(`Missing or invalid param: ${paramName}`);
}

function internalError(res, message) {
    logger.error(message);
    return res.status(500).send('Internal Server Error');
}

module.exports = {
    invalidParam,
    internalError,
};
