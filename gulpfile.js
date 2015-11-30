"use strict";

var gulp = require('gulp');
//Runs a local dev server
var connect = require('gulp-connect');
// Opens a URL in a web browser
var open = require('gulp-open');
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream');// Use conventional text streams with
var concat = require('gulp-concat');//Concatenates files
var lint = require('gulp-eslint'); // Lint JS Files, including JSX


var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        mainJs: './src/main.js',
        dist: './dist',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ]

    }
};

// Start a local Development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });

});

// Task to open index.html file and open it in the give URI
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html').pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
})

// Puts the Html files from src to dist location and reload the server once it is done
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});
// This watches the html files in the path. If any html is modified, it reruns the html task.
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});


// Default task. When we type gulp in the command line, it runs html ,open  and watch tasks
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
