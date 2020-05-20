const { MemberModel } = require('./model');

function toMemberObjectList(members) {
    return members.map((member) => {
        const { id, name } = member;
        return {
            id: id.toString(),
            name,
        };
    });
}

class Member {
    constructor({ teamId, members }) {
        this.teamId = teamId;
        this.members = members;
    }

    create(callback) {
        const { teamId, members } = this;
        const records = members.map((name) => ({ teamId, name }));
        return MemberModel.set(records)
            .then(() => this.get(callback))
            .catch((error) => callback(error));
    }

    get(callback) {
        const { teamId } = this;
        return MemberModel.get({ teamId })
            .then((result) => callback(null, toMemberObjectList(result)))
            .catch((error) => callback(error));
    }
}

module.exports = {
    Member,
};
