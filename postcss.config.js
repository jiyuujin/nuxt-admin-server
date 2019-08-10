module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')({
            cascade: false,
            grid: true
        }),
        require('cssnano')({
            preset: 'default',
            discardComments: { removeAll: true },
            zindex: false
        })
    ]
}
