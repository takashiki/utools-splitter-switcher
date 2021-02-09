const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    module: {
        rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // babelrc: true,
                        cacheDirectory: true // 启用缓存
                    }
                }],
            },
            {
                test: /\.(css|less)$/,
                use: [{
                        loader: "style-loader",
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/style.css' : 'css/style.[contenthash].css',
            chunkFilename: devMode ? 'css/style.[id].css' : 'css/style.[contenthash].[id].css'
        }),
    ]
}