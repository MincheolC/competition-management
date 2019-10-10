const { queryBuilder, paramQuery, paramQueryOne } = require('../../helpers/database');
const { assertNumber } = require('../../helpers/assert');

function insertTeam(competitionId, { name, city }, callback) {
    assertNumber(competitionId, 'competitionId');

    const queryObject = queryBuilder.insert()
        .into('team')
        .set('competitionId', competitionId)
        .set('name', name)
        .set('city', city);

    paramQuery(queryObject, callback);
}

function insertMembers(teamId, { members }, callback) {
    assertNumber(teamId, 'teamId');

    const rows = members.map((name) => ({ teamId, name }));
    const queryObject = queryBuilder.insert()
        .into('member')
        .setFieldsRows(rows);

    paramQuery(queryObject, callback);
}

function selectTeam(competitionId, name, callback) {
    assertNumber(competitionId, 'competitionId');

    const queryObject = queryBuilder.select()
        .from('team')
        .where('name = ?', name);

    paramQueryOne(queryObject, callback);
}

function selectAllTeam(competitionId, callback) {
    assertNumber(competitionId, 'competitionId');

    const queryObject = queryBuilder.select()
        .from('team');

    paramQuery(queryObject, callback);
}

function selectMembers(teamId, callback) {
    assertNumber(teamId, 'teamId');

    const queryObject = queryBuilder.select()
        .from('member')
        .where('teamId = ?', teamId);

    paramQuery(queryObject, callback);
}

function selectTeamAndMember(teamId, memberId, callback) {
    assertNumber(teamId, 'teamId');
    assertNumber(memberId, 'memberId');

    const queryObject = queryBuilder.select()
        .from('team', 't')
        .join('member', 'm', 't.id = m.teamId')
        .where('t.id = ? and m.id = ?', teamId, memberId);

    paramQueryOne(queryObject, callback);
}

module.exports = {
    selectTeam,
    selectAllTeam,
    selectMembers,
    selectTeamAndMember,
    insertTeam,
    insertMembers,
};
