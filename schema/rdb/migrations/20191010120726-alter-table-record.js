const TABLENAME = 'record';

module.exports = {
    up: (queryInterface, Sequelize, done) => {
        queryInterface.addConstraint(TABLENAME, ['memberId', 'round'], {
            type: 'unique',
            name: 'memberId_round_unique'
        }).then((result) => done(null, result), (err) => done(err));
    },
    down: (queryInterface, Sequelize, done) => done(null),
};
