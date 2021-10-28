var path = require("path");
module.exports = {
  entry: "./src/App.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(ts|js)x?$/i,
  //       include: path.resolve(__dirname, "src"),
  //       exclude: /(node_modules|build)/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: [
  //             "@babel/core",
  //             "@babel/preset-react",
  //             "@babel/preset-typescript",
  //           ],
  //         },
  //       },
  //     },
  //   ],
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: { contentBase: path.join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  mode: "production",
};
