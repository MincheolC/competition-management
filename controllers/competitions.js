const { internalError } = require('../helpers/error');
const { Competition } = require('../models/competition');
const logger = require('../helpers/logger');

function getResult(req, res) {
    const competition = new Competition(req.params.competitionId);
    return competition.getResult((error, resultObject) => {
        if (!error) {
            return res.send(resultObject);
        }

        logger.error(error.message);
        return internalError(res, 'internal error occurred');
    });
}

module.exports = {
    getResult,
};
