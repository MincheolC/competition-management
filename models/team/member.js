const { insertMembers, selectMembers } = require('./query');

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
        insertMembers(this.teamId, { members: this.members }, (error) => {
            if (error) {
                return callback(error);
            }
            return this.get(callback);
        });
    }

    get(callback) {
        selectMembers(this.teamId, (error, result) => {
            if (error) {
                return callback(error);
            }
            return callback(null, toMemberObjectList(result));
        });
    }
}

module.exports = {
    Member,
};
