const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { sync } = require('glob');
const files = sync('./src/web/views/**/*.entry.js');
const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AfterHtmlPlugin = require('./config/AfterHtmlPlugin');
let entry = {
  // 形如：
  // 'books-create':'./src/web/views/books/books-create.entry.js';
};
let _plugins = [];

for (const item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)/g.test(item)) {
    // entry[]
    const entryKey = RegExp.$1;
    // console.log("entryKey: ", entryKey);
    entry[entryKey] = item;
    const [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        filename: `../views/${dist}/pages/${template}.html`,
        template: `./src/web/views/${dist}/pages/${template}.html`,
        chunks: ['runtime', entryKey], // 对应模块对应打包
      })
    );
  } else {
    // 非正确退出webpack
    console.log('请输入正确的文件名称');
    process.exit(-1);
  }
}
const webpackConfig = {
  entry,
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [..._plugins, new MiniCssExtractPlugin(), new AfterHtmlPlugin()],
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:8].bundle.js',
  },
  optimization: {
    // 提取runtime的公共model，减少每个chunk的体积
    runtimeChunk: {
      name: 'runtime',
    },
  },
};

module.exports = merge(webpackConfig, _mergeConfig);
