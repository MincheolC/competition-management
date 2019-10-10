const query = require('../query');

jest.mock('../../../helpers/database', () => {
    const { queryBuilder, setOrNot } = require.requireActual('../../../helpers/database');
    const mockParamQuery = jest.fn((queryObject, callback) => {
        const queryParams = queryObject.toParam();
        return callback(null, [queryParams]);
    });

    return {
        paramQuery: mockParamQuery,
        paramQueryOne: mockParamQuery,
        queryBuilder,
        setOrNot,
    };
});

describe('insertRecord', () => {
    it('with all props', () => {
        query.insertRecord({
            memberId: 1,
            round: 1,
            runningTime: 1120,
            sitUpCount: 57,
            pushUpCount: 70,
        }, (error, [{ text, values }]) => {
            expect(text).toBe('INSERT INTO record (memberId, round, runningTime, sitUpCount, pushUpCount) VALUES (?, ?, ?, ?, ?)');
            expect(values).toEqual([1, 1, 1120, 57, 70]);
        });
    });
});

describe('updateRecord', () => {
    it('with all props', () => {
        query.updateRecord({
            memberId: 1,
            round: 1,
            runningTime: 1120,
        }, (error, [{ text, values }]) => {
            expect(text).toBe('UPDATE record SET runningTime = ? WHERE (memberId = ? and round = ?)');
            expect(values).toEqual([1120, 1, 1]);
        });
    });
});

describe('selectRecord', () => {
    it('with all props', () => {
        const memberId = 1;
        const round = 1;
        query.selectRecord(memberId, round, (error, [{ text, values }]) => {
            expect(text).toBe('SELECT * FROM record WHERE (memberId = ? and round = ?)');
            expect(values).toEqual([1, 1]);
        });
    });
});
