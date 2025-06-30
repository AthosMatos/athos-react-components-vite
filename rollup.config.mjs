import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: "src/module-index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
        declarationMap: false,
        exclude: ["**/*.test.*", "**/*.spec.*", "**/*.stories.*", "src/main.tsx", "src/tt.tsx"],
      }),
      commonjs(),
      postcss({
        extract: false,
        inject: true,
        minimize: true,
      }),
      terser(),
    ],
    external: [
      ...Object.keys(packageJson.peerDependencies || {}),
      ...Object.keys(packageJson.dependencies || {}).filter(dep => 
        !dep.startsWith('@types/')
      ),
    ],
  },
  {
    input: "src/module-index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/, /\.scss$/, /\.sass$/],
  },
];