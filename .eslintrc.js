module.exports = {
    env: {
        es6: true,
        browser: true,
    },
    extends: [
        'airbnb-base',
        'plugin:vue/recommended',
        'prettier',
        'prettier/vue',
    ],
    plugins: [
        'prettier',
        'vue',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    rules: {
        "prettier/prettier": ['error'],
        "no-console": ["error", { "allow": ["warn", "error"] }],
        eqeqeq: ['error', 'smart'],
        "vue/eqeqeq": ['error'],
        "id-length": ['error', { exceptions: ['i'], properties: "never" }],
        camelcase: ['error'],
    }
};
