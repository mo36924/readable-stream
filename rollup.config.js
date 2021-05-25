import { isAbsolute } from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "es",
        interop: false,
        exports: "named",
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        interop: false,
        exports: "named",
      },
    ],
    external(id, parentId) {
      if (id.startsWith(".") || isAbsolute(id) || !parentId) {
        return false;
      }

      return true;
    },
    plugins: [commonjs({ ignoreGlobal: true }), terser({ ecma: 2017 })],
  },
  {
    input: "src/index.client.js",
    output: [
      {
        file: "dist/index.client.js",
        format: "es",
        interop: false,
        exports: "named",
      },
      {
        file: "dist/index.client.cjs",
        format: "cjs",
        interop: false,
        exports: "named",
      },
    ],
    external(id, parentId) {
      if (id.startsWith(".") || isAbsolute(id) || !parentId) {
        return false;
      }

      return true;
    },
    plugins: [commonjs({ ignoreGlobal: true }), terser({ ecma: 2017 })],
  },
];
