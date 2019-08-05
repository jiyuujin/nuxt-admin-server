module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/essential'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error"
    }
}
