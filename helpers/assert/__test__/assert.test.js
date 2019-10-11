const {
    assert,
    assertArray,
    assertNonEmptyString,
    assertNotNull,
    assertNumber,
    assertNumberOrNull,
    assertString,
    assertStringOrNull,
} = require('../');
const { assertType, buildMessage } = require('../')._;

describe('assert()', () => {
    it('should throw on false condition', () => {
        expect(() => {
            assert(false);
        }).toThrowError('Assertion');
    });

    it('should NOT throw on true condition', () => {
        expect(() => {
            assert(true);
        }).not.toThrow();
    });

    it('should have default error message on assertion failure', () => {
        try {
            assert(false);
        } catch (error) {
            expect(error.message).toBe('Assertion failed');
        }
    });

    it('should have custom error message on assertion failure', () => {
        const customMessage = 'custom message';
        try {
            assert(false, customMessage);
        } catch (e) {
            expect(e.message).toBe(customMessage);
        }
    });
});

describe('buildMesssage', () => {
    const defaultMessage = 'some default message';
    const customMessage = 'some custom message';

    it('should return custom message if available', () => {
        const message = buildMessage(defaultMessage, null, customMessage);
        expect(message).toBe(customMessage);
    });

    it('should use default message if there is no custom message', () => {
        const message = buildMessage(defaultMessage, null);
        expect(message).toBe(defaultMessage);
    });

    it('should use param name if param name is provided', () => {
        const message = buildMessage(defaultMessage, 'some param name');
        expect(message).toMatch(/some param name/);
    });
});

describe('assertNotNull()', () => {
    it('should throw on NULL', () => {
        const error = 'NULL';
        expect(() => assertNotNull(null)).toThrowError(error);
        expect(() => assertNotNull(undefined)).toThrowError(error);
    });

    it('should NOT throw on NOT NULL', () => {
        expect(() => assertNotNull(0)).not.toThrow();
    });
});

describe('assertType()', () => {
    it('should throw on wrong type', () => {
        expect(() => assertType('hi', 'number')).toThrowError('number type');
    });

    it('should NOT throw on correct type', () => {
        expect(() => assertType('hi', 'string')).not.toThrow();
    });

    it('should throw with param name in error message', () => {
        try {
            const someParam = 'hi';
            assertType(someParam, 'undefined', 'someParam');
        } catch (e) {
            expect(e.message).toMatch(/someParam/);
        }
    });

    it('should throw without param name in error message', () => {
        try {
            assertType('hi', 'number');
        } catch (e) {
            expect(e.message).toMatch(/number type assertion failed/);
        }
    });

    it('should throw when expectedType param is not string type', () => {
        expect(() => assertType('hi', {})).toThrowError('Assertion');
    });
});

describe('assertType() dependents', () => {
    it('assertNumber() should not throw on number', () => {
        expect(() => {
            assertNumber(1);
            assertNumber(1.1);
        }).not.toThrow();
    });

    it('assertNumber() should throw on non-number', () => {
        const testValues = ['1', null, undefined, NaN];
        const error = 'number';

        testValues.forEach((value) => {
            expect(() => assertNumber(value)).toThrowError(error);
        });
    });

    it('assertNumberOrNull() should not throw on number', () => {
        expect(() => {
            assertNumberOrNull(1);
            assertNumberOrNull(1.1);
        }).not.toThrow();
    });

    it('assertNumberOrNull() should not throw on null', () => {
        expect(() => {
            assertNumberOrNull(null);
            assertNumberOrNull(undefined);
        }).not.toThrow();
    });

    it('assertString() should not throw on string', () => {
        expect(() => {
            assertString('1');
            assertString('');
        }).not.toThrow();
    });

    it('assertString() should throw on non-string', () => {
        expect(() => assertString(null)).toThrowError('string type');
    });

    it('assertStringOrNull() should throw on non-string', () => {
        expect(() => assertStringOrNull(1)).toThrowError('string type');
        expect(() => assertStringOrNull({})).toThrowError('string type');
    });

    it('assertStringOrNull() should not throw string or null', () => {
        expect(() => {
            assertStringOrNull('string');
            assertStringOrNull(null);
        }).not.toThrow();
    });

    it('assertNonEmptyString() should not throw on string', () => {
        expect(() => {
            assertNonEmptyString('1');
            assertNonEmptyString('blah blah');
        }).not.toThrow();
    });

    it('assertNonEmptyString() should throw on empty string or null', () => {
        const testValues = [1, null, undefined, {}];

        testValues.forEach((value) => {
            expect(() => assertNonEmptyString(value)).toThrowError('string type');
        });
        expect(() => assertNonEmptyString('', 'empty string')).toThrowError('empty string');
    });
});

describe('assertArray()', () => {
    it('should throw on non-array type', () => {
        const testValues = ['', null, undefined, {}];

        testValues.forEach((value) => {
            expect(() => assertArray(value)).toThrowError('array');
        });
    });

    it('should throw with error message', () => {
        try {
            const notArray = undefined;
            assertArray(notArray, 'nonArray');
        } catch (e) {
            expect(e.message).toMatch(/nonArray/);
        }
    });

    it('should NOT throw for array type', () => {
        expect(() => assertArray([])).not.toThrow();
    });
});
