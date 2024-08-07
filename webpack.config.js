const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: path.resolve(__dirname, 'src/assets'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: path.resolve(__dirname, 'src'),
                        publicPath: 'assets/'
                    }
                }]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles.css",
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
