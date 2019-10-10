const { calculateTeamScore, sortByScoreDesc, insertGrades } = require('../')._;

describe('calculateTeamScore', () => {
    it('with valid params', () => {
        const records = [{
            id: 1,
            memberId: 1,
            round: 1,
            runningTime: 1200,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 2,
            memberId: 1,
            round: 2,
            runningTime: 1250,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 3,
            memberId: 2,
            round: 1,
            runningTime: 1300,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 4,
            memberId: 2,
            round: 2,
            runningTime: 1350,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 5,
            memberId: 3,
            round: 1,
            runningTime: 1100,
            sitUpCount: 50,
            pushUpCount: 70,
        }, {
            id: 6,
            memberId: 3,
            round: 2,
            runningTime: 1300,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 7,
            memberId: 4,
            round: 1,
            runningTime: 1000,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 8,
            memberId: 4,
            round: 2,
            runningTime: 1100,
            sitUpCount: 30,
            pushUpCount: 20,
        }, {
            id: 9,
            memberId: 5,
            round: 1,
            runningTime: 1150,
            sitUpCount: 10,
            pushUpCount: 20,
        }, {
            id: 10,
            memberId: 5,
            round: 2,
            runningTime: 1190,
            sitUpCount: 10,
            pushUpCount: 20,
        }];
        const expectedTeamScore = 230;
        expect(calculateTeamScore(records)).toBe(expectedTeamScore);
    });
});

describe('sortByScoreDesc', () => {
    it('with valid params', () => {
        const teamScores = [{
            teamId: 1,
            teamName: 'test01',
            score: 500,
        }, {
            teamId: 2,
            teamName: 'test02',
            score: 300,
        }, {
            teamId: 3,
            teamName: 'test03',
            score: 400,
        }, {
            teamId: 4,
            teamName: 'test04',
            score: 420,
        }];

        const expectedTeamScores = [{
            teamId: 1,
            teamName: 'test01',
            score: 500,
        }, {
            teamId: 4,
            teamName: 'test04',
            score: 420,
        }, {
            teamId: 3,
            teamName: 'test03',
            score: 400,
        }, {
            teamId: 2,
            teamName: 'test02',
            score: 300,
        }];
        sortByScoreDesc(teamScores);
        expect(teamScores).toEqual(expectedTeamScores);
    });
});

describe('insertGrades', () => {
    it('with valid params', () => {
        const teamScores = [{
            teamId: 1,
            teamName: 'test01',
            score: 500,
        }, {
            teamId: 4,
            teamName: 'test04',
            score: 420,
        }, {
            teamId: 3,
            teamName: 'test03',
            score: 400,
        }, {
            teamId: 2,
            teamName: 'test02',
            score: 300,
        }];

        const expectedTeamScores = [{
            teamId: 1,
            teamName: 'test01',
            score: 500,
            grade: 1,
        }, {
            teamId: 4,
            teamName: 'test04',
            score: 420,
            grade: 2,
        }, {
            teamId: 3,
            teamName: 'test03',
            score: 400,
            grade: 3,
        }, {
            teamId: 2,
            teamName: 'test02',
            score: 300,
            grade: 4,
        }];
        insertGrades(teamScores);
        expect(teamScores).toEqual(expectedTeamScores);
    });
});
