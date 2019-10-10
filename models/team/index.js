const waterfall = require('async/waterfall');
const { insertTeam, selectTeam } = require('./query');
const { Member } = require('./member');

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

    create(callback) {
        waterfall([
            (done) => {
                insertTeam(this.competitionId, this, (err) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null);
                });
            },
            (done) => {
                selectTeam(this.competitionId, this.name, (err, { id }) => {
                    if (err) {
                        return done(err);
                    }
                    this.teamId = id;
                    return done(null);
                });
            },
            (done) => {
                const member = new Member(this);
                member.create((err, members) => {
                    if (err) {
                        return done(err);
                    }
                    this.membersWithId = members;
                    return done(null);
                });
            },
        ], (error) => {
            if (error) {
                return callback(error);
            }
            return callback(null, toTeamObject(this));
        });
    }
}

module.exports = {
    Team,
};
