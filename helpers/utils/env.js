function isTest() {
    return (process.env.NODE_ENV === 'test');
}

function isDevelopment() {
    return (process.env.NODE_ENV === 'development');
}

function isDebugging() {
    return Boolean(Number(process.env.DEBUG_MODE));
}

function get() {
    return process.env.NODE_ENV || 'development';
}

module.exports = {
    isDebugging,
    isTest,
    isDevelopment,
    get,
};
