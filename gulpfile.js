var gulp = require('gulp');
var del = require('del');
var WebpackDevServer = require('webpack-dev-server');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var log = require('fancy-log');

gulp.task('clean:tmp', function () {
    return del([
        // 'index.html',
        // here we use a globbing pattern to match everything inside the `mobile` folder
        'assets/**/*'
    ]);
});

gulp.task('webpack', function() {
    return gulp.src('src/entry.js')
        .pipe(webpackStream( require('./webpack.config.js') ))
        .pipe(gulp.dest('assets/'));
});


gulp.task('webpack-dev-server', function(callback) {
    // modify some webpack config options

    var myConfig = Object.create(require('./webpack.config.js'));
    // myConfig.devtool = 'eval';
    // myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            colors: true
        },
        contentBase: 'dist/'
    }).listen(8181, 'localhost', function(err) {
        if(err) throw new log.error('webpack-dev-server', err);
        log('[webpack-dev-server]', 'http://localhost:8181/webpack-dev-server/index.html');
    });
});

var browserSync = require('browser-sync').create();

var webpackDevMiddleware  =  require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var myConfig = Object.create(require('./webpack.config.js'));
var bundler = webpack(myConfig);

// gulp.task('default', ['webpack']);
const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/ny2018/pushreport', {
    target: 'https://www.raiffeisen.ru/',
    changeOrigin: true,
    logLevel: 'debug'
});

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
        startPath: 'index.html?test2',
        middleware: [
            apiProxy,
            webpackDevMiddleware(bundler, { /* options */ }),
            webpackHotMiddleware(bundler)
        ]
    });
});
