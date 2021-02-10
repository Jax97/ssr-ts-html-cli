const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  watch: true,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../src/web/views/layout"),
          to: "../views/layout",
        },
        {
          from: path.join(__dirname, "../src/web/components"),
          to: "../components",
        },
      ],
    }),
  ],
};
