const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "index.css"
});

const config = {
    entry: "./src/js/demo.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js', '.json', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'postcss-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000
                }
            }
        ]
    },
    plugins: [
        extractSass
    ]
};

if (process.env.NODE_ENV !== 'production') {

    config.devServer = {
        hot: true,
        publicPath: '/build/',
        port: 9001,
        quiet: false
    };

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

}

module.exports = config;
