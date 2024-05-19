import path, { resolve as _resolve } from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
    mode: "production",
    entry: "./src/index.ts",
    target: "node",
    externals: [nodeExternals()],
    externalsPresets: {
        node: true, // in order to ignore built-in modules like path, fs, etc.
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader",
            },
            {
                test: /\.graphql?$/,
                loader: "graphql-tag/loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"],
        },
    },
    output: {
        filename: "bundle.js",
        path: _resolve(__dirname, "dist"),
    },
};
//# sourceMappingURL=webpack.config.js.map