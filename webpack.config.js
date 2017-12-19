var NODE_ENV = process.env.NODE_ENV;

// const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

var sourceMaps, minimize, consoleMessage, fileSuffix;
if (NODE_ENV == 'production') {
    //sourceMaps = false;
    minimize = true;
    consoleMessage = "Production mode";
    fileSuffix = '.min';
} else {
    //sourceMaps = true;
    minimize = false;
    consoleMessage = "Dev mode";
    fileSuffix = '';
}
console.info("\x1b[37m", "\x1b[40m");
console.info("\x1b[35m", "\x1b[40m", consoleMessage);
console.info("\x1b[37m", "\x1b[40m");

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

var entryPath = path.join(__dirname, 'app');        //path to input dir
var assetsPath = path.join(__dirname, 'assets');    //path to output dir

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

var config = {
    context: entryPath,
    entry: {
        styles: './js/styles.js',
        bundle: './js/index.js'
    },
    output: {
        path: assetsPath,
        filename: "[name]" + fileSuffix + ".js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].[id].js",
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 1,
                                import: false,
                                url: false,
                                sourceMap: false,
                                minimize: minimize
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 2,
                                import: false,
                                url: false,
                                sourceMap: false,
                                minimize: minimize
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                paths: [
                                    path.resolve(entryPath)
                                ],
                                plugins: [
                                    require('less-plugin-glob')
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?prefix=img/&limit=30000&q=100&name=[name].[ext]'
            },
            {
                test: /\.svg$/,
                exclude: [
                    path.join(entryPath, '/i/sprite'),
                ],
                use: 'url-loader?limit=30000&mimetype=image/svg+xml&name=[name].[ext]'
            },
            {
                test: /\.svg$/,
                include: [
                    path.join(entryPath, '/i/sprite'),
                ],
                use: [{
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: 'spr-[name]'
                        //extract: true
                    }
                },
                'svgo-loader']
            },
            {
                test: /\.woff$/,
                use: 'url-loader?prefix=font/&limit=30000&mimetype=application/font-woff&name=[name].[ext]'
            },
            {
                test: /\.woff2$/,
                use: 'url-loader?prefix=font/&limit=30000&mimetype=application/font-woff2&name=[name].[ext]'
            },
            {
                test: /\.eot$/,
                use: 'url-loader?prefix=font/&limit=30000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]'
            },
            {
                test: /\.(ttf|otf)$/,
                use: 'url-loader?prefix=font/&limit=30000&mimetype=application/octet-stream&name=[name].[ext]'
            },
            {
                test: /\.(js|es6)$/ ,
                exclude: /(node_modules|\.font\.|\.min\.js)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]' + fileSuffix + '.css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.php'),
            filename: path.join(__dirname, 'index.html'),
            inject: false,
            chunks: ['bundle','styles']
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer({
                        browsers: ['last 3 version']
                    })];
                }
            }
        }),
        new CopyWebpackPlugin([
            {from: 'i', to: 'i'}
        ]),
        new SpriteLoaderPlugin()
        // ,new FaviconsWebpackPlugin({
        //     logo: 'icon.png',
        //     prefix: 'i/',
        // })
    ],
    watch: false
};

if (NODE_ENV == 'production') {
    //uglifying enabled
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        mangle: false,
        sourceMap: false
    }));


    //pregzip enabled
    const ZopfliPlugin = require("zopfli-webpack-plugin");
    config.plugins.push(new ZopfliPlugin({
        asset: "[path].gz[query]",
        algorithm: "zopfli",
        test: /\.(js|html|css|svg|json|woff|woff2|eot|ttf|map|png)$/,
        threshold: 5120,
        minRatio: 0.8
    }));

    //minimization enabled
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

} else {
    // config.devtool = "source-map";
}

module.exports = config;