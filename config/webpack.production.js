const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const minify = require('html-minifier').minify;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/web/views/layout'),
          to: '../views/layout',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
        {
          from: path.join(__dirname, '../src/web/components'),
          to: '../components',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
      ],
    }),
  ],
};
