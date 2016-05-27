var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/Main.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js|\.jsx$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: require.resolve('tinygradient'),
                loader: 'imports?tinycolor'
            }
        ]
    }
};
