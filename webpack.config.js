const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './app/index.js'
    ],
    // resolve: {
    //     extensions: ['', '.js', '.jsx']
    // },
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
                // include: [
                //     path.join(__dirname, 'app/'),
                // ],
                // loaders: ['react-hot-loader/webpack', 'babel'],
                loader: 'babel-loader',
            },
            {
                test: /\.ts$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'scripts'),
                ],
                // include: [
                //     path.join(__dirname, 'app/'),
                // ],
                loader: 'babel-loader',
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
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new HtmlWebpackPlugin({
        //     template: './app/index.html',
        //     filename: 'index.html',
        //     inject: 'body'
        // }),


        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     comments: false,
        //     sourceMap: true,
        //     mangle: true,
        //     minimize: true
        // }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


};