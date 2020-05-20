const each = require('async/each');

const { TeamModel } = require('../team/model');
const { MemberModel } = require('../member/model');
const { RecordModel } = require('../record/model');

function isZeroScore(successMemberIdsSet) {
    return successMemberIdsSet.size < 3;
}

function buildSuccessMemberSet(records) {
    const TWENTY_MINUTES = 1200;
    const successMemberIds = new Set();
    records.forEach(({ memberId, runningTime }) => {
        if (runningTime <= TWENTY_MINUTES) {
            successMemberIds.add(memberId);
        }
    });
    return successMemberIds;
}

function filterSuccessMemberRecords(successMemberIdsSet, records) {
    return records.filter(({ memberId }) => successMemberIdsSet.has(memberId));
}

function calculateTeamScore(records) {
    const successMemberRecord = new Map();
    const successMemberScores = new Map();
    const successMemberIdsSet = buildSuccessMemberSet(records);

    if (isZeroScore(successMemberIdsSet)) {
        return 0;
    }

    filterSuccessMemberRecords(successMemberIdsSet, records).forEach((record) => {
        const {
            memberId, sitUpCount, pushUpCount,
        } = record;

        const { sitUp, pushUp } = successMemberRecord.get(memberId) || { sitUp: 0, pushUp: 0 };
        const highestSitUpCount = sitUpCount > sitUp ? sitUpCount : sitUp;
        const highestPushUpCount = pushUpCount > pushUp ? pushUpCount : pushUp;

        successMemberRecord.set(memberId, { sitUp: highestSitUpCount, pushUp: highestPushUpCount });
        successMemberScores.set(memberId, highestSitUpCount + highestPushUpCount);
    });

    return Array.from(successMemberScores.values()).reduce((a, b) => a + b);
}

function sortByScoreDesc(teamScores) {
    teamScores.sort((a, b) => b.score - a.score);
}

function insertGrades(teamScores) {
    let grade = 0;
    let prevTeamScore = Number.MAX_VALUE;
    teamScores.forEach((teamScore) => {
        if (prevTeamScore > teamScore.score) {
            grade += 1;
        }
        teamScore.grade = grade;
        prevTeamScore = teamScore.score;
    });
}

function calculateTeamScores(allTeamRecords) {
    const teamScores = allTeamRecords.map(({ teamId, teamName, records }) => ({
        teamId,
        teamName,
        score: calculateTeamScore(records),
    }));
    sortByScoreDesc(teamScores);
    insertGrades(teamScores);
    return teamScores;
}

function toResultObject(competitionId, allTeamRecords) {
    return {
        competitionId,
        teamScores: calculateTeamScores(allTeamRecords),
    };
}

function calculateResult(competitionId, teams, callback) {
    MemberModel.hasMany(RecordModel, { foreignKey: 'memberId' });
    RecordModel.belongsTo(MemberModel, { foreignKey: 'memberId' });

    const allTeamRecords = [];
    each(teams, (team, done) => {
        const { id: teamId, name: teamName } = team;
        RecordModel.get({}, [{ model: MemberModel, where: { teamId } }])
            .then((records) => {
                allTeamRecords.push({ teamId, teamName, records });
                done(null);
            })
            .catch((err) => done(err));
    }, (eachError) => callback(eachError, toResultObject(competitionId, allTeamRecords)));
}

class Competition {
    constructor(competitionId) {
        this.competitionId = parseInt(competitionId, 10);
    }

    async getResult(callback) {
        const { competitionId } = this;
        try {
            const teams = await TeamModel.get({ competitionId });
            return calculateResult(competitionId, teams, callback);
        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = {
    Competition,
};

module.exports._ = {
    calculateTeamScore,
    sortByScoreDesc,
    insertGrades,
};
