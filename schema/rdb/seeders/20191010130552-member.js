const TABLE_NAME = 'member';

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(TABLE_NAME, [{
        teamId: 1,
        name: 'Seed Member 1',
    }, {
        teamId: 1,
        name: 'Seed Member 2',
    }, {
        teamId: 1,
        name: 'Seed Member 3',
    }, {
        teamId: 1,
        name: 'Seed Member 4',
    }, {
        teamId: 1,
        name: 'Seed Member 5',
    }], {}),
    down: queryInterface => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};
