const {
    queryBuilder, paramQuery, paramQueryOne, setOrNot,
} = require('../../helpers/database');
const { assertNumber } = require('../../helpers/assert');

function insertRecord(params, callback) {
    const {
        memberId, round, runningTime, sitUpCount, pushUpCount,
    } = params;
    assertNumber(memberId, 'memberId');

    const queryObject = queryBuilder.insert()
        .into('record')
        .set('memberId', memberId)
        .set('round', round)
        .set('runningTime', runningTime)
        .set('sitUpCount', sitUpCount)
        .set('pushUpCount', pushUpCount);

    paramQuery(queryObject, callback);
}

function updateRecord(params, callback) {
    const {
        memberId, round, runningTime, sitUpCount, pushUpCount,
    } = params;
    assertNumber(memberId, 'memberId');
    assertNumber(round, 'round');

    const queryObject = queryBuilder.update()
        .table('record')
        .where('memberId = ? and round = ?', memberId, round);

    setOrNot(queryObject, 'runningTime', runningTime);
    setOrNot(queryObject, 'sitUpCount', sitUpCount);
    setOrNot(queryObject, 'pushUpCount', pushUpCount);

    paramQuery(queryObject, callback);
}

function selectRecord(memberId, round, callback) {
    assertNumber(memberId, 'memberId');
    assertNumber(round, 'round');

    const queryObject = queryBuilder.select()
        .from('record')
        .where('memberId = ? and round = ?', memberId, round);

    paramQueryOne(queryObject, callback);
}

function selectAllRecordsOfTeam(teamId, callback) {
    assertNumber(teamId, 'teamId');

    const queryObject = queryBuilder.select()
        .from('member', 'm')
        .join('record', 'r', 'm.id = r.memberId')
        .where('m.teamId = ?', teamId)
        .field('r.*');

    paramQuery(queryObject, callback);
}

module.exports = {
    insertRecord,
    updateRecord,
    selectRecord,
    selectAllRecordsOfTeam,
};
