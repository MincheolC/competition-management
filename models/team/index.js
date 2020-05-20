const { TeamModel } = require('./model');
const { Member } = require('../member');

function toTeamObject(props) {
    return {
        id: props.teamId.toString(),
        competitionId: props.competitionId.toString(),
        name: props.name,
        city: props.city,
        members: props.membersWithId,
    };
}

class Team {
    constructor(competitionId, props) {
        this.competitionId = parseInt(competitionId, 10);
        this.name = props.name;
        this.city = props.city;
        this.members = props.members;
        this.teamId = props.teamId;
    }

    async create(callback) {
        try {
            const { competitionId, name, city } = this;
            const team = await TeamModel.setOne({ competitionId, name, city });
            const { id } = team.dataValues;
            this.teamId = id;

            const member = new Member(this);
            return member.create((err, members) => {
                if (err) {
                    return callback(err);
                }
                this.membersWithId = members;
                return callback(null, toTeamObject(this));
            });
        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = {
    Team,
};
