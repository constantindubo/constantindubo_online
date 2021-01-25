
// FOLDERS & PATHS

let source_folder  = "app";
let project_folder = "www";


let path = {
    build: {
        html:  project_folder + "/",
        css:   project_folder + "/css/",
        js:    project_folder + "/js/",
        img:   project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css:   source_folder + "/scss/style.scss",
        js:    source_folder + "/js/script.js",
        img:   source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        html:  source_folder + "/**/*.html",
        css:   source_folder + "/scss/**/*.scss",
        js:    source_folder + "/js/**/*.js",
        img:   source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + project_folder + "/"
};

// GLOBAL VARS & BROWSER SYNC

let {src, dest} = require("gulp");
let gulp        = require("gulp");
let browsersync = require("browser-sync").create();

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

// HTML 

let fileinclude = require("gulp-file-include");

function html() {
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

exports.html = html;

//CSS

let scss         = require("gulp-sass");
let group_media  = require("gulp-group-css-media-queries");
let autoprefixer = require("gulp-autoprefixer");
let clean_css    = require("gulp-clean-css");
let rename       = require("gulp-rename");

function css() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
        )
    .pipe(
        group_media()
        )
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        })
        )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
        extname: ".min.css"
    })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

exports.css = css;

// JS

let js_uglify      = require("gulp-uglify-es").default;
let js_fileinclude = require("gulp-file-include");
let js_rename      = require("gulp-rename");

function js() {
    return src(path.src.js)
    .pipe(js_fileinclude())
    .pipe(dest(path.build.js))
    .pipe(js_uglify())
    .pipe(js_rename({
        extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

exports.js = js;

// IMAGES

let imagemin = require("gulp-imagemin");

function images() {
    return src(path.src.img)

    .pipe(imagemin({
        verbose: true,
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{
            removeViewBox: false
        }],
        
    })) 
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

exports.images = images;


// FONTS

function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

exports.fonts = fonts;


// CLEAN

let del = require("del");

function clean() {
    return del(path.clean)
}


// WATCHFILES

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}


// GULP

// let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);

let build = gulp.series(clean, gulp.parallel(js, css, html, images), fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.build   = build;
exports.watch   = watch;
exports.default = watch;