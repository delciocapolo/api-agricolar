import { defineConfig } from "tsup";
import babel from "@rollup/plugin-babel";

export default defineConfig({
  entry: ["src"],
  splitting: true,
  sourcemap: true,
  format: "esm",
  clean: true,
  loader: {
    ".graphql": "file",
    ".mwb": "file",
    ".prisma": "file",
    ".sql": "file",
    ".bak": "file",
    ".md": "file",
  },
  ignoreWatch: [
    ".graphql",
    ".mwb",
    ".mwb.back",
    ".md",
    ".sql",
    ".mk",
  ],
  // Habilitar esta opção irá preencher algum código ao construir esm/cjs para fazê-lo funcionar,
  // como __dirname que está disponível apenas no módulo cjs e import.meta.url que está disponível
  // apenas no módulo esm
  shims: true,
  plugins: [
    babel({
      extensions: [".ts", ".mts", ".js", ".jsx", ".es6", ".es", ".mjs"],
      babelHelpers: "bundled",
    }),
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    },
  ],
});
