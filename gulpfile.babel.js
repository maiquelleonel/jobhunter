import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import gutil from 'gulp-util'
import rename from 'gulp-rename'
import cssnano from 'cssnano'
import browserSync from 'browser-sync'
import nodemon from 'gulp-nodemon'
import plumber from 'gulp-plumber'
import path from 'path'

let bSync = browserSync.create()

const PATHS = {
    src_css: './src/public/scss/',
    src_js: './src/public/js/',
    src_node: './src/',
    dist_css: './dist/public/css/',
    dist_js: './dist/public/js/',
    dist_node: './dist/'
}

let onError = (err) => {
    gutil.beep()
    console.log(err)
}

gulp.task('sass', () => {
    let plugins = [
        autoprefixer({ browsers: ['Last 2 versions']}),
        cssnano()
    ]

    return gulp.src( path.join(PATHS.src_css, '*.scss' ))
               .pipe( sass().on('error', sass.logError) )
               .pipe( postcss(plugins) )
               .pipe( rename({ suffix: '.min'}) )
               .pipe( gulp.dest( PATHS.dist_css ) )
               .pipe( bSync.stream() )
})

gulp.task('babel', () => {
    return gulp.src( path.join(PATHS.src_js, '*.js') )
               .pipe( plumber({ errorHandler: onError }))
               .pipe( babel({ presets: ['es2015','stage-2'] }))
               .pipe( gulp.dest( PATHS.dist_js ) )
})


gulp.task('babel-server', () => {
    return gulp.src([
                path.join(PATHS.src_node, '*.js'),
                path.join(PATHS.src_node, './configs/**/*.js'),
                path.join(PATHS.src_node, './models/**/*.js'),
                path.join(PATHS.src_node, './routes/**/*.js'),
                path.join(PATHS.src_node, './services/**/*.js')
            ], { base: './src' })
            .pipe( gulp.dest( PATHS.dist_node ))
            .pipe( babel({ presets: ['es2015','stage-2'] }) )
            .pipe( gulp.dest( PATHS.dist_node ))
})

gulp.task('nodemon', ( cb ) => {
    let started = false

    return nodemon({
        script: './dist/app.js'
    })
    .on('start', () => {
        if(! started ){
            cb()
            started = true
        }
    })
})


gulp.task('mv-tmpl', () => {
    return gulp.src(path.join(PATHS.src_node, './views/**/*.hbs'), { base: './src' })
               .pipe(gulp.dest(PATHS.dist_node))
})

gulp.task('default', ['sass', 'mv-tmpl', 'babel',  'babel-server', 'nodemon'], () => {
    bSync.init(null, {
        proxy: 'http://localhost:9000',
        port: 5000,
        files: ['dist/**/*']
    })

    gulp.watch('*.hbs').on('change', bSync.reload )
    gulp.watch( path.join(PATHS.src_css, '*.scss') , ['sass'] )
    gulp.watch( path.join(PATHS.src_js, '*.js') , ['babel'] )
    gulp.watch( path.join(PATHS.src_node, './**/*.js') , ['babel-server'] )
    gulp.watch( path.join(PATHS.src_node,'./**/*.hbs'), ['mv-tmpl'] )
});
