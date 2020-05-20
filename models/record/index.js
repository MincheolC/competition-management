const { RecordModel } = require('./model');
const { MemberModel } = require('../member/model');

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

function filterNull(obj) {
    const newObj = {};
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (obj[key]) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

async function validateTeamMember(teamId, memberId) {
    const member = await MemberModel.getOne({ teamId, id: memberId });
    if (!member) {
        throw new Error(`memberId ${memberId} is not belong to teamId ${teamId}`);
    }
    return null;
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

    async create(callback) {
        try {
            const {
                competitionId, teamId, memberId, round, runningTime, sitUpCount, pushUpCount,
            } = this;

            await validateTeamMember(teamId, memberId);
            await RecordModel.setOne({
                memberId, round, runningTime, sitUpCount, pushUpCount,
            });
            const record = await RecordModel.getOne({ memberId, round });
            return callback(null,
                toRecordObject(competitionId, teamId, record));
        } catch (err) {
            return callback(err);
        }
    }

    async update(callback) {
        try {
            const {
                competitionId, teamId, memberId, round, runningTime, sitUpCount, pushUpCount,
            } = this;
            const updateObj = filterNull({ runningTime, sitUpCount, pushUpCount });

            await validateTeamMember(teamId, memberId);
            const [updated] = await RecordModel.updateOne(updateObj,
                { where: { memberId, round } });

            if (!updated) {
                throw new Error('no record to update');
            }

            const record = await RecordModel.getOne({ memberId, round });
            return callback(null,
                toRecordObject(competitionId, teamId, record));
        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = {
    Record,
};
