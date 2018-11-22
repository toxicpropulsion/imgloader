const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const wait = require("gulp-wait");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const path = require("path");
const rename = require("gulp-rename");

const paths = {
  scss: ["public/src/scss/**/*.scss", "!public/src/scss/**/_*.scss"],
  scss_dir: ["public/src/scss/**/**/*.scss"],

  src_scss: ["public/src/scss/**/*.scss", "!public/src/scss/**/_*.scss"],
  src_scss_dir: ["public/src/scss/**/**/*.scss"],
  src_svg: ["public/src/img/*.svg"],
  dist_css: "public/dist/css/",
  dist_img: "public/dist/img/"
};

// Combine and minify svg
gulp.task("svgstore", function() {
  return gulp
    .src(paths.src_svg)
    .pipe(
      svgmin(function(file) {
        let prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: prefix + "-",
                minify: true
              }
            }
          ]
        };
      })
    )
    .pipe(svgstore())
    .pipe(rename("sprites.svg"))
    .pipe(gulp.dest(paths.dist_img));
});

// Compile SASS
gulp.task("sass", function() {
  return gulp
    .src(paths.src_scss)
    .pipe(wait(1000))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("styles.min.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.dist_css));
});

// Watch files for changes
gulp.task("watch", function() {
  gulp.watch([paths.src_scss, paths.src_scss_dir], ["sass"]);
  gulp.watch([paths.src_svg], ["svgstore"]);
});

// Default task
gulp.task("default", ["svgstore", "sass", "watch"]);
