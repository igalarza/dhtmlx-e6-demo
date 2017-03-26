
var gulp = require('gulp');
var rollup = require('rollup-stream');
var nodeResolve = require('rollup-plugin-node-resolve');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var buble = require('rollup-plugin-buble');
var uglify = require('gulp-uglify');
var html = require('rollup-plugin-html');
var css = require('rollup-plugin-css-only');
var runSequence = require('run-sequence');
var del = require('del');
var eslint = require('rollup-plugin-eslint');
var includePaths = require('rollup-plugin-includepaths');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('default', function() {
	runSequence('clean', 'build', 'deploy-css', 'deploy-vendor', 'deploy-html');
});

var cache;
gulp.task('build', function() {
	return rollup({
      entry: './src/main.js',
	  cache: cache,
	  format: 'cjs',
	  context: 'window',
	  sourceMap: true,
	  plugins: [
		// Extracts html templates
		html({
            exclude: 'src/index.html',
			htmlMinifierOptions: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                minifyJS: false
            }
        }),
		
		// Extract css templates
		css({ output: 'dist/bundle.css' }),
		
		// Include internal paths
		includePaths({
			include: {},
			paths: ['src/'],
			external: [],
			extensions: ['.js', '.json']
		}),
		
		// Include external paths
		nodeResolve(),
		
		// Check syntax
		eslint(),
		
		// Transform code to old plain javascript
		buble()		
	  ]
    })
	
	// necessary for "gulp watch" to work
	.on('bundle', function(bundle) {
      cache = bundle;
    })

    // give the file the name you want to output with
    .pipe(source('src/main.js'))
	
	// buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
    .pipe(buffer())

    // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
    .pipe(sourcemaps.init({loadMaps: true}))

    // transform the code further here.
	.pipe(uglify())

    // Change output filename
    .pipe(rename('bundle.min.js'))
	
	// Add js resources to cache
    .pipe(cachebust.resources())

    // write the sourcemap alongside the output file.
    .pipe(sourcemaps.write('./'))

    // and output the javascript
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

// Copy src/index.html to dist folder
gulp.task('deploy-html', function() {
	return gulp.src('src/index.html')
	// Change references in html page
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist/'));
});

// Copy vendor files to dist folder
gulp.task('deploy-css', function() {
	gulp.src('dist/bundle.css')
	// Add css resources to cache
    .pipe(cachebust.resources())
    .pipe(gulp.dest('dist/'));
	
	return del('dist/bundle.css');
});

// Copy vendor files to dist folder
gulp.task('deploy-vendor', ['copy-vendor-css', 'copy-vendor-js', 'copy-vendor-resources']);

// Copy vendor files to dist folder
gulp.task('copy-vendor-css', function() {
	return gulp.src('vendor/*.css')
	// Add css resources to cache
    .pipe(cachebust.resources())
    .pipe(gulp.dest('dist/vendor/'));
});

// Copy vendor files to dist folder
gulp.task('copy-vendor-css', function() {
	return gulp.src('vendor/*.css')
	// Add css resources to cache
    .pipe(cachebust.resources())
    .pipe(gulp.dest('dist/vendor/'));
});

// Copy vendor files to dist folder
gulp.task('copy-vendor-js', function() {
	return gulp.src('vendor/*.js')
	// Add js resources to cache
    .pipe(cachebust.resources())
    .pipe(gulp.dest('dist/vendor/'));
});

// Copy vendor files to dist folder
gulp.task('copy-vendor-resources', function() {
	return gulp.src(['vendor/**/*', '!vendor/*.js'])
    .pipe(gulp.dest('dist/vendor/'));
});

// Watch for changes in the code!
gulp.task('watch', function() {
	gulp.watch(
		['./src/**/*.js', './src/**/*.html'], 
		['build']);
});