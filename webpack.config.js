import path from "path";
import webpack from "webpack";

export default [
  {
    mode: "production",
    target: "node",
    entry: "readable-stream",
    output: {
      path: path.resolve("dist"),
      filename: "index.js",
      library: {
        type: "commonjs2",
      },
    },
    externals({ request }, callback) {
      if (request === "readable-stream" || request.startsWith(".")) {
        callback();
      } else if (request === "string_decoder/") {
        callback(null, { commonjs2: "string_decoder" });
      } else {
        callback(null, { commonjs2: request });
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.READABLE_STREAM": "undefined",
      }),
    ],
  },
  {
    mode: "production",
    target: "web",
    entry: "readable-stream",
    output: {
      path: path.resolve("dist"),
      filename: "index.client.js",
      library: {
        type: "commonjs2",
      },
    },
    externals({ request }, callback) {
      if (request === "readable-stream" || request.startsWith(".")) {
        callback();
      } else if (request === "string_decoder/") {
        callback(null, { commonjs2: "string_decoder" });
      } else {
        callback(null, { commonjs2: request });
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        global: "self",
        "process.env.READABLE_STREAM": "undefined",
      }),
    ],
  },
];
