const { assertNumber, assertNonEmptyString, assertNumberOrNull } = require('../helpers/assert');
const { invalidParam, internalError } = require('../helpers/error');
const { Record } = require('../models/record');
const logger = require('../helpers/logger');

function createRecord(req, res) {
    const { params, body } = req;
    try {
        const {
            memberId, round, runningTime, sitUpCount, pushUpCount,
        } = body;

        assertNonEmptyString(memberId, 'memberId');
        assertNumber(round, 'round');
        assertNumber(runningTime, 'runningTime');
        assertNumber(sitUpCount, 'sitUpCount');
        assertNumber(pushUpCount, 'pushUpCount');
    } catch (e) {
        return invalidParam(res, e.message);
    }

    const record = new Record(params.competitionId, params.teamId, body);
    return record.create((error, recordObject) => {
        if (!error) {
            return res.send(recordObject);
        }

        logger.error(error.message);
        if (error.message.includes('belong to')) {
            return invalidParam(res, error.message);
        }
        if (error.message.includes('Duplicate')) {
            return invalidParam(res, "member's record already exist");
        }
        return internalError(res, 'internal error occurred');
    });
}

function isNothingToUpdateRecord(body) {
    const { memberId, round } = body;
    const bodyPropsCount = Object.keys(body).length;
    return !body || bodyPropsCount < 2 || (bodyPropsCount === 2 && typeof memberId === 'string' && typeof round === 'number');
}

function updateRecord(req, res) {
    const { params, body } = req;

    if (isNothingToUpdateRecord(body)) {
        return res.send('Nothing to update');
    }

    try {
        const {
            memberId, round, runningTime, sitUpCount, pushUpCount,
        } = body;

        assertNonEmptyString(memberId, 'memberId');
        assertNumberOrNull(round, 'round');
        assertNumberOrNull(runningTime, 'runningTime');
        assertNumberOrNull(sitUpCount, 'sitUpCount');
        assertNumberOrNull(pushUpCount, 'pushUpCount');
    } catch (e) {
        return invalidParam(res, e.message);
    }

    const record = new Record(params.competitionId, params.teamId, body);
    return record.update((error, recordObject) => {
        if (!error) {
            return res.send(recordObject);
        }

        logger.error(error.message);
        if (error.message.includes('belong to') || error.message.includes('no record')) {
            return invalidParam(res, error.message);
        }
        return internalError(res, 'internal error occurred');
    });
}

module.exports = {
    createRecord,
    updateRecord,
};
