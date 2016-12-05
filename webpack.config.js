const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");

module.exports = {
    entry: {
        vendor: [ "jquery" ],
        main: [ "./src/js/index.js", "./src/resource/index.less", ...glob.sync("./src/*.html"), ...glob.sync("./src/icons/*.png")]
    },
    output: {
        path: path.resolve("./build"),
        publicPath: "/build",
        filename: "[name]/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader!file-loader?limit=8192&name=/icons/[name].[ext]'
            },
            {
                test: /\.(html|htm)$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/bundle.css")
        // new HtmlWebpackPlugin()
    ],
};
