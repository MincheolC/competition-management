const each = require('async/each');

const { selectAllRecordsOfTeam } = require('../record/query');
const { selectAllTeam } = require('../team/query');

function isZeroScore(succesMemberScoresMap) {
    return succesMemberScoresMap.size < 3;
}

function calculateTeamScore(records) {
    const successMemberScores = new Map();
    const TWENTY_MINUTES = 1200;

    records.forEach((record) => {
        const {
            memberId, runningTime, sitUpCount, pushUpCount,
        } = record;

        if (runningTime <= TWENTY_MINUTES) {
            const previousScore = successMemberScores.get(memberId) || 0;
            const currentScore = sitUpCount + pushUpCount;
            if (previousScore < currentScore) {
                successMemberScores.set(memberId, currentScore);
            }
        }
    });

    if (isZeroScore(successMemberScores)) {
        return 0;
    }
    return Array.from(successMemberScores.values()).reduce((a, b) => a + b);
}

function sortByScoreDesc(teamScores) {
    teamScores.sort((a, b) => b.score - a.score);
}

function insertGrades(teamScores) {
    let grade = 1;
    teamScores.forEach((teamScore) => {
        teamScore.grade = grade;
        grade += 1;
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
    const allTeamRecords = [];
    each(teams, (team, done) => {
        const { id: teamId, name: teamName } = team;
        selectAllRecordsOfTeam(teamId, (error, records) => {
            if (error) {
                return done(error);
            }
            allTeamRecords.push({
                teamId,
                teamName,
                records,
            });
            return done(null);
        });
    }, (eachError) => callback(eachError, toResultObject(competitionId, allTeamRecords)));
}

class Competition {
    constructor(competitionId) {
        this.competitionId = parseInt(competitionId, 10);
    }

    getResult(callback) {
        selectAllTeam(this.competitionId, (error, teams) => {
            if (error) {
                return callback(error);
            }
            return calculateResult(this.competitionId, teams, callback);
        });
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
