const query = require('../query');

jest.mock('../../../helpers/database', () => {
    const { queryBuilder } = require.requireActual('../../../helpers/database');
    const mockParamQuery = jest.fn((queryObject, callback) => {
        const queryParams = queryObject.toParam();
        return callback(null, [queryParams]);
    });

    return {
        paramQuery: mockParamQuery,
        paramQueryOne: mockParamQuery,
        queryBuilder,
    };
});

describe('insertTeam', () => {
    it('with all props', () => {
        const competitionId = 1;
        query.insertTeam(competitionId, {
            name: 'FIFL',
            city: 'Seoul',
        }, (error, [{ text, values }]) => {
            expect(text).toBe('INSERT INTO team (competitionId, name, city) VALUES (?, ?, ?)');
            expect(values).toEqual([1, 'FIFL', 'Seoul']);
        });
    });
});

describe('insertMembers', () => {
    it('with all props', () => {
        const teamId = 1;
        query.insertMembers(teamId, {
            members: ['a', 'b', 'c', 'd', 'e'],
        }, (error, [{ text, values }]) => {
            expect(text).toBe('INSERT INTO member (teamId, name) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)');
            expect(values).toEqual([1, 'a', 1, 'b', 1, 'c', 1, 'd', 1, 'e']);
        });
    });
});

describe('selectTeam', () => {
    it('with all props', () => {
        const competitionId = 1;
        query.selectTeam(competitionId, 'FIFL', (error, [{ text, values }]) => {
            expect(text).toBe('SELECT * FROM team WHERE (name = ?)');
            expect(values).toEqual(['FIFL']);
        });
    });
});

describe('selectMembers', () => {
    it('with all props', () => {
        const teamId = 1;
        query.selectMembers(teamId, (error, [{ text, values }]) => {
            expect(text).toBe('SELECT * FROM member WHERE (teamId = ?)');
            expect(values).toEqual([1]);
        });
    });
});
