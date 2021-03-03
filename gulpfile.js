const gulp = require('gulp');
const ts = require('gulp-typescript');
const alias = require('gulp-ts-alias');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');
const babel = require('gulp-babel');
// import watch from 'gulp-watch';
// import babel from 'gulp-babel';

const tsProject = ts.createProject('tsconfig.json'); // 创建增量编译的项目
const entry = './src/server/**/*.ts';
const cleanEntry = './src/server/config/index.js';

// 开发环境
function buildDev() {
  // 与前端的babelrc分开，设置ignoreInitial: false和 babelrc：false
  // return watch(entry, { ignoreInitial: false }).pipe(
  //   gulp
  //     .src(entry)
  //     // .pipe(
  //     //   babel({
  //     //     plugins: ['@babel/plugin-transform-modules-commonjs'],
  //     //   })
  //     // )
  //     .pipe(tsProject())
  //     .pipe(gulp.dest('./dist'))
  // );
  return gulp
    .src(entry)
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(tsProject())
    .pipe(
      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          '@babel/plugin-transform-modules-commonjs',
        ],
      })
    )
    .pipe(gulp.dest('./dist'));
}

// 生产环境
function buildProd() {
  return gulp
    .src(entry)
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(tsProject())
    .pipe(
      babel({
        babelrc: false,
        ignore: [cleanEntry],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          '@babel/plugin-transform-modules-commonjs',
        ],
      })
    )
    .pipe(gulp.dest('./dist'));
}

// 清洗环境
function cleanConfig() {
  return gulp
    .src(entry)
    .pipe(
      rollup({
        allowRealFiles: true,
        input: cleanEntry,
        output: {
          format: 'cjs',
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': "'production'",
          }),
        ],
      })
    )
    .pipe(gulp.dest('./dist'));
}

let build;
if (process.env.NODE_ENV === 'development') {
  build = gulp.series(buildDev);
}
// export default gulp.watch(gulp.task('default', build));

if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildProd, cleanConfig);
}

gulp.task('default', build);

if (process.env.NODE_ENV !== 'production') {
  gulp.watch(entry, gulp.series('default'));
}
