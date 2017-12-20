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
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var GenerateJsonPlugin = require('generate-json-webpack-plugin');
var HtmlCriticalPlugin = require("html-critical-webpack-plugin");

var WebpackCleanupPlugin = require('webpack-cleanup-plugin');


var entryPath = path.join(__dirname, 'app');        //path to input dir
var assetsPath = path.join(__dirname, 'assets');    //path to output dir

var config = {
    context: entryPath,
    entry: {
        bundle: './js/index.js'
    },
    output: {
        path: assetsPath,
        filename: '[name].[hash]' + fileSuffix + '.js',
        sourceMapFilename: "[file].map"
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
                use: 'url-loader?limit=30000&mimetype=image/svg+xml&name=[name].[ext]'
            },
            // {
            //     test: /\.svg$/,
            //     include: [
            //         path.join(entryPath, '/i/sprite'),
            //     ],
            //     use: [{
            //         loader: 'svg-url-loader',
            //         options: {
            //             iesafe: true,
            //             encoding: 'base64',
            //             stripdeclarations: true
            //         }
            //     },{
            //         loader: 'svg-sprite-loader',
            //         options: {
            //             symbolId: 'spr-[name]'
            //             //extract: true
            //         }
            //     },
            //     'svgo-loader']
            // },
            {
                test: /\.woff|woff2|eot|ttf|otf$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: process.env.NODE_ENV === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]'
                    }
                }]
            },
            // {
            //     test: /\.woff$/,
            //     use: 'url-loader?prefix=font/&limit=30000&mimetype=application/font-woff&name=[name].[ext]'
            // },
            // {
            //     test: /\.woff2$/,
            //     use: 'url-loader?prefix=font/&limit=30000&mimetype=application/font-woff2&name=[name].[ext]'
            // },
            // {
            //     test: /\.eot$/,
            //     use: 'url-loader?prefix=font/&limit=30000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]'
            // },
            // {
            //     test: /\.(ttf|otf)$/,
            //     use: 'url-loader?prefix=font/&limit=30000&mimetype=application/octet-stream&name=[name].[ext]'
            // },
            {
                test: /\.(js|es6)$/ ,
                exclude: /(node_modules|\.font\.|\.min\.js)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new WebpackCleanupPlugin(),
        new ExtractTextPlugin('[name].[hash]' + fileSuffix + '.css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.php'),
            filename: path.join(__dirname, 'index.html'),
            inject: 'body',
            chunks: ['bundle']
        }),
        new GenerateJsonPlugin('../widget-ver.json', {
            jobName: process.env.JOB_NAME,
            buildNumber: process.env.BUILD_NUMBER,
            gitBranch: process.env.GIT_BRANCH,
            gitCommit: process.env.GIT_COMMIT
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
        new HtmlCriticalPlugin({
            base: path.resolve(__dirname),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: process.env.NODE_ENV === 'production' ? true : false,
            extract: true,
            penthouse: {
                blockJSRequests: false,
            }
        }),
        new CopyWebpackPlugin([
            {from: 'i', to: 'i'}
        ]),
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
    config.devtool = "source-map";
}

module.exports = config;