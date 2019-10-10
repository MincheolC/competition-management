function assert(condition, message) {
    if (!condition) {
        if (message instanceof Error) {
            throw message;
        }

        throw new Error(message || 'Assertion failed');
    }
}

function buildMessage(defaultMessage, paramName, customMessage) {
    if (customMessage) {
        return customMessage;
    }

    if (paramName) {
        return paramName;
    }

    return defaultMessage;
}

function assertNotNull(value, paramName, customMessage) {
    const message = buildMessage('Assert NOT NULL failed', paramName, customMessage);
    assert(value != null, message);
}

const TYPE_ERROR_MESSAGE = 'type assertion failed';
function assertType(value, expectedType, paramName) {
    assert(typeof expectedType === 'string');

    const message = paramName ? `${paramName}` : `${expectedType} ${TYPE_ERROR_MESSAGE}`;

    // eslint-disable-next-line valid-typeof
    assert(typeof value === expectedType, message);
}

function assertNumber(value, paramName) {
    assertType(value, 'number', paramName);
    assert(!Number.isNaN(value), paramName || `number ${TYPE_ERROR_MESSAGE}`);
}

function assertNumberOrNull(value, paramName) {
    if (value != null) {
        assertNumber(value, paramName);
    }
}

function assertString(value, paramName) {
    assertType(value, 'string', paramName);
}

function assertStringOrNull(value, paramName) {
    if (value != null) {
        assertString(value, paramName);
    }
}

function assertNonEmptyString(value, paramName) {
    assert(value !== '', paramName);
    assertString(value, paramName);
}

function assertArray(value, paramName) {
    const errorMessage = paramName || 'Assert failed: not an array type';
    assert(Array.isArray(value), errorMessage);
}

function assertArrayOrNull(value, paramName) {
    if (value != null) {
        assertArray(value, paramName);
    }
}

module.exports = {
    assert,
    assertArray,
    assertArrayOrNull,
    assertNotNull,
    assertNumber,
    assertNumberOrNull,
    assertString,
    assertStringOrNull,
    assertNonEmptyString,
};

module.exports._ = {
    assertType,
    buildMessage,
};
