const { assert, assertArray, assertNonEmptyString } = require('../helpers/assert');
const { invalidParam, internalError } = require('../helpers/error');
const { Team } = require('../models/team');
const logger = require('../helpers/logger');

function checkCreateTeamParams({ name, city, members }) {
    assertNonEmptyString(name, 'name');
    assertNonEmptyString(city, 'city');
    assertArray(members, 'members');
    assert(members.length === 5, 'the number of members should be 5');
    members.forEach((member) => assertNonEmptyString(member, 'member'));
}

function createTeam(req, res) {
    const { params, body } = req;
    try {
        checkCreateTeamParams(body);
    } catch (e) {
        return invalidParam(res, e.message);
    }

    const team = new Team(params.competitionId, body);
    return team.create((error, teamObject) => {
        if (!error) {
            return res.send(teamObject);
        }

        logger.error(error.message);
        if (error.message.includes('Duplicate')) {
            return invalidParam(res, 'Team name already exists');
        }
        return internalError(res, 'internal error occurred');
    });
}

module.exports = {
    createTeam,
};

module.exports._ = {
    checkCreateTeamParams,
};
