const TABLE_NAME = 'team';

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(TABLE_NAME, [{
        competitionId: 1,
        name: 'Seed',
        city: 'Seed'
    }], {}),
    down: queryInterface => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};
