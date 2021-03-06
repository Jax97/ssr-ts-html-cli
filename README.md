# ssr-ts-html-cli

### ssr-cli 步骤

#### 服务端配置

```

1. 启动服务端 Koa
2. @types/node 绑定 node 类型
3. 下载@types/koa 即可使用 import
4. 如何在 ts 中使用 import export ，配置"esModuleInterop": true,
5. 编写 config 区分不同的环境,用上 cross-env 、scripty，注意 cross-env 不在 ts 文件生效，在 js 文件生效。而且 GitHub 无法提 issue
6. 用 gulp 启动 node 服务，并将 node 服务输出到 dist 文件夹
   <!-- 1. gulp-watch 监听服务启动 注意看 gulp-watch 的使用 待研究 -->
   <!-- 2. gulp-babel 将 es6 转为 es5 。 使用了gulp-typescripte 就不需要gulp-babel。-->
   1. gulp.watch 监听服务启动 注意看 gulp.watch 的使用
7. gulp-ts-alias 对server中的ts文件起别名
8. 配置controllers和koa-router，启动基本的多页面
9. 配置models打通controller层和model层
10. 使用koa-swig对模板进行解析
11. gulp 数据清洗（treeShaking）gulp-rollup 原理是通过@rollup/replace-plugin设置某个变量的值为确定值，让gulp-rollup认为是废代码 扩展：prepack
12. 使用awilix awilix-koa实现IOC


```

#### 客户端配置

```
1. 配置 webpack ，yargs-parser 合并基本 webpack config 和其他环境的 webpack config
2. 建立前端页面 views components 等
3. 在 views 中引入的 HTML 除了要引入有 HTML 外，还要引入该 HTML 所需的 js，使用 webpack 及建立对应路由映射的 js 文件实现。
4. 取views下的*.entry.js文件，匹配对应的key，将该key与文件路径对应上，并配置webpack打包出js文件。
5. copy-webpack-plugin 将公共的compoents和banner copy到对应的文件夹路径。
6. 脚本插入位置不对，手动修正，通过HtmlWebpackPlugin的生命周期结合webpack4自定义的插件去修正。
7. 配置生产环境webpack，通过html-minifier将cpoy过来的html进行压缩，通过optimize-css-assets-webpack-plugin将copy过来的css进行压缩
8. 通过pjax实现切页spa 分别处理html和js
9. 在用户网速不错的情况下，使用quicklink缓存其他页面.
10. basket.js缓存load下来的页面

```

#### 共同配置

1. 配置 typedoc 将 ts 的接口注释输出到 docs/tsdoc

### 注意事项

1. 下载包时，除了@types 包外，还得下载正常包。分别用于 esModule 和 commonjs 使用

2. gulp 中的 babelrc 需要设置 false，避免与根目录的 babelrc 冲突
3. cross-env 在 src 的 ts 中不生效
4. scripty Windows 下用 bat 结尾 其他系统用 sh 结尾
