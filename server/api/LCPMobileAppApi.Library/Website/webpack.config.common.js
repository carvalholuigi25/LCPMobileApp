const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'assets/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs|cjs|ts|tsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|svg|gif|bmp|webp)$/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[name].[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/fonts/[name].[hash][ext][query]'
                }
            },
            {
                test: /\.(json)$/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/json/[name].[hash][ext][query]'
                }
            }
        ]
    }
}