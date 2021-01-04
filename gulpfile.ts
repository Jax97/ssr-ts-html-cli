import gulp from 'gulp';
// import watch from 'gulp-watch';
// import babel from 'gulp-babel';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json'); // 创建增量编译的项目
const entry = './src/server/**/*.ts';

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
  return gulp.src(entry).pipe(tsProject()).pipe(gulp.dest('./dist'));
}

// 生产环境
function buildProd() {}

// 清洗环境
function buildConfig() {}
let build = gulp.series(buildDev);
// export default gulp.watch(gulp.task('default', build));

if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildProd, buildConfig);
}

gulp.task('default', build);

if (process.env.NODE_ENV !== 'production') {
  gulp.watch(entry, gulp.series('default'));
}
