var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:8080',
        // 'webpack/hot/dev-server',
        './app/index.js'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/app',
        // path: path.resolve(__dirname, 'app/'),
        publicPath: "app/",
        filename: "index.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'scripts'),
                ],
                include: [
                    path.join(__dirname, 'app/'),
                ],
                loader: 'react-hot!babel',
            }
        ]
    },
    // devtool: 'source-map',
    devServer: {
        contentBase: './',
        hot: false,
        noInfo: true,
        colors: true,
        quiet: false,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true
        })
    ]


};