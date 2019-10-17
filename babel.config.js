module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['> 1%', 'last 2 versions'],
                    node: 'current'
                }
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                'helpers': false,
                'polyfill': false,
                'regenerator': true,
                'moduleName': 'babel-runtime'
            }
        ]
    ]
}
