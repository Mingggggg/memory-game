const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders:
                [
                    'style-loader',
                    'css-loader?outputStyle=expanded&sourceMap'
                ]
            },
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            },
        ]
    },
    resolve: {
        extensions: ['.jsx','.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: "/js/",
    },
};