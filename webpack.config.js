const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            hot: true,
            open: true,
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/index.html' },
                    { from: /^\/pricing$/, to: '/pricing.html' },
                    { from: /^\/get-started$/, to: '/get-started.html' },
                ],
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'
                    ],
                },
                {
                    test: /\.xml/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'sitemap.xml',
                    },
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]', // No [path] here to avoid duplicating directories
                                outputPath: (url, resourcePath, context) => {
                                    // Remove the 'src/' from the path and place files correctly
                                    const relativePath = path.relative(context, resourcePath);
                                    const correctedPath = relativePath.replace('src/', '');
                                    return correctedPath;
                                },
                                publicPath: (url, resourcePath, context) => {
                                    // Ensuring the public path mirrors the outputPath
                                    const relativePath = path.relative(context, resourcePath);
                                    const correctedPath = relativePath.replace('src/', '');
                                    return correctedPath;
                                },
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: { progressive: true },
                                optipng: { enabled: true },
                                pngquant: { quality: [0.65, 0.90], speed: 4 },
                                gifsicle: { interlaced: false },
                                webp: { quality: 75 },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
            new HtmlWebpackPlugin({
                template: './src/get-started.html',
                filename: 'get-started.html',
            }),
            new HtmlWebpackPlugin({
                template: './src/pricing.html',
                filename: 'pricing.html',
            }),
            new HtmlWebpackPlugin({
                template: './src/about.html',
                filename: 'about.html',
            }),
            ...(isProduction ? [] : [new webpack.HotModuleReplacementPlugin()]),
            ...(isProduction ? [] : [new BundleAnalyzerPlugin()]), // Comment this out in production if not needed
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
            ],
        },
        devtool: isProduction ? false : 'source-map',
    };
};
