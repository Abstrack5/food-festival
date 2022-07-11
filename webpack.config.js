const path = require('path');
const webpack = require('webpack'); // required because plugins is built into webpack

module.exports = { 
    entry: './assets/js/script.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
};