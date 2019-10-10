const waterfall = require('async/waterfall');
const { selectTeamAndMember } = require('../team/query');
const { insertRecord, selectRecord, updateRecord } = require('./query');

function toRecordObject(competitionId, teamId, props) {
    const {
        memberId, round, runningTime, sitUpCount, pushUpCount,
    } = props;

    return {
        competitionId,
        teamId,
        memberId,
        round,
        runningTime,
        sitUpCount,
        pushUpCount,
    };
}

function validateTeamMember(teamId, memberId, callback) {
    selectTeamAndMember(teamId, memberId, (err, result) => {
        if (err) {
            return callback(err);
        }

        if (!result) {
            const error = {
                message: `memberId ${memberId} is not belong to teamId ${teamId}`,
            };
            return callback(error);
        }

        return callback(null);
    });
}

class Record {
    constructor(competitionId, teamId, props) {
        this.competitionId = competitionId;
        this.teamId = parseInt(teamId, 10);
        this.memberId = parseInt(props.memberId, 10);
        this.round = props.round;
        this.runningTime = props.runningTime;
        this.sitUpCount = props.sitUpCount;
        this.pushUpCount = props.pushUpCount;
    }

    create(callback) {
        waterfall([
            (done) => validateTeamMember(this.teamId, this.memberId, done),
            (done) => {
                insertRecord(this, (err) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null);
                });
            },
            (done) => selectRecord(this.memberId, this.round, done),
        ], (err, record) => {
            if (err) {
                return callback(err);
            }
            return callback(null, toRecordObject(this.competitionId, this.teamId, record));
        });
    }

    update(callback) {
        waterfall([
            (done) => validateTeamMember(this.teamId, this.memberId, done),
            (done) => {
                updateRecord(this, (err) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null);
                });
            },
            (done) => selectRecord(this.memberId, this.round, done),
        ], (err, record) => {
            if (err) {
                return callback(err);
            }
            if (!record) {
                return callback({ message: 'no record to update' });
            }
            return callback(null, toRecordObject(this.competitionId, this.teamId, record));
        });
    }
}

module.exports = {
    Record,
};
