const { checkCreateTeamParams } = require('../teams')._;

describe('checkCreateTeamParams', () => {
    function checkStringParam(params, message) {
        expect(() => checkCreateTeamParams(params)).toThrowError(message);

        const invalidValues = [1, '', null, undefined, {}];
        invalidValues.forEach((value) => {
            params[message] = value;
            expect(() => checkCreateTeamParams(params)).toThrowError(message);
        });
    }
    it('should be throw error with invalid params "name"', () => {
        checkStringParam({}, 'name');
    });

    it('should be throw error with invalid params "city"', () => {
        checkStringParam({ name: 'FIFL' }, 'city');
    });

    it('should be throw error with invalid params "members"', () => {
        const params = {
            name: 'FIFL',
            city: 'Seoul',
        };
        expect(() => checkCreateTeamParams(params)).toThrowError('members');

        params.members = [];
        expect(() => checkCreateTeamParams(params)).toThrowError('the number of members should be 5');

        const invalidValues = [1, '', null, undefined, {}, ['test', '']];
        invalidValues.forEach((value) => {
            params.members = value;
            expect(() => checkCreateTeamParams(params)).toThrowError('members');
        });
    });
});
