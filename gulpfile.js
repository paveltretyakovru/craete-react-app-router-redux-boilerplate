var gulp = require('gulp');
var del = require('del');
var WebpackDevServer = require('webpack-dev-server');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var log = require('fancy-log');
var open = require('gulp-open');

gulp.task('clean:tmp', function () {
    return del([
        'index.html',
        // here we use a globbing pattern to match everything inside the `assets` folder
        'criticalcss*/**/*',
        'assets/**/*'
    ]);
});

// gulp.task('webpack', function() {
//     return gulp.src('src/entry.js')
//         .pipe(webpackStream( require('./webpack.config.js') ))
//         .pipe(gulp.dest('assets/'));
// });

// gulp.task('open', function(){
//     gulp.src('./index.html')
//         .pipe(open());
// });
gulp.task('webpack-dev-server', ['clean:tmp'], function(callback) {
    // modify some webpack config options

    var myConfig = Object.create(require('./webpack.config.js'));
    // myConfig.devtool = 'eval';
    // myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath || '/assets/',
        stats: {
            colors: true
        },
        contentBase: __dirname,
        open: true,
        openPage: '/index.html?test0',
        compress: true, //similar to prod
        https: true //similar to prod
    }).listen(8181, 'localhost', function(err) {
        if(err) throw new log.error('webpack-dev-server', err);
        log('[webpack-dev-server]', 'https://localhost:8181/webpack-dev-server/index.html?test0');
    });
});

var browserSync = require('browser-sync').create();

var webpackDevMiddleware  =  require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var myConfig = Object.create(require('./webpack.config.js'));
var bundler = webpack(myConfig);
var compress = require('compression');

// gulp.task('default', ['webpack']);
const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/ny2018/pushreport', {
    target: 'https://гпн-лидеры-россии.рф/',
    changeOrigin: true,
    logLevel: 'debug'
});

// gulp.task('browser-sync', ['clean:tmp'], function() {
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        directory: true,
        port: 8181,
        open: "local",
        browser: "google chrome",
        cors: true,
        // httpModule: 'http2', //for testing purpose
        https: true, //similar to prod
        startPath: 'index.html?test0',
        middleware: [
            apiProxy, //does not work with h2
            compress(), //similar to prod, does not work with h2
            webpackDevMiddleware(bundler, {
                publicPath: myConfig.output.publicPath || '/assets/',
                index: 'index.html',
                stats: { colors: true }
            }),
            webpackHotMiddleware(bundler)
        ]
    });
});

gulp.task('default', ['browser-sync']);