module.exports = {
    extends: 'airbnb-base',
    env: {
        jest: true,
        node: true,
    },
    rules: {
        "callback-return": ["error", ["callback", "cb", "done", "next"]],
        "indent": ['error', 4],
        "no-lonely-if": ['off'],
        "no-param-reassign": ["error", { "props": false }],
        "no-plusplus": ['error', { "allowForLoopAfterthoughts": true }],
    },
};