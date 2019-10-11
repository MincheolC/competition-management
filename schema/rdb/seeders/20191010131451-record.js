const TABLE_NAME = 'record';

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(TABLE_NAME, [{
        memberId: 1,
        round: 1,
        runningTime: 1200,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 1,
        round: 2,
        runningTime: 1250,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 2,
        round: 1,
        runningTime: 1300,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 2,
        round: 2,
        runningTime: 1350,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 3,
        round: 1,
        runningTime: 1100,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 3,
        round: 2,
        runningTime: 1300,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 4,
        round: 1,
        runningTime: 1000,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 4,
        round: 2,
        runningTime: 1100,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 5,
        round: 1,
        runningTime: 1150,
        sitUpCount: 10,
        pushUpCount: 20,
    }, {
        memberId: 5,
        round: 2,
        runningTime: 1190,
        sitUpCount: 10,
        pushUpCount: 20,
    }], {}),
    down: queryInterface => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};
