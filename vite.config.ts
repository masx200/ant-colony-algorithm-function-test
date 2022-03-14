import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import babel from "@rollup/plugin-babel";
export default defineConfig(({ mode, command }) => {
    console.log(mode, command);
    const isdrop = mode === "production" && command === "build";
    return {
        esbuild: {
            legalComments: "none",
            drop: isdrop ? ["console", "debugger"] : undefined,
        },
        root: path.resolve(__dirname, "src"),
        plugins: [
            vuePlugin(),
            // mode === "production" &&
            //     command === "build" &&
            babel({
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],
                plugins: [
                    [
                        "babel-plugin-import",
                        {
                            libraryName: "lodash",
                            libraryDirectory: "",
                            camel2DashComponentName: false, // default: true
                        },
                    ],
                    isdrop && "babel-plugin-clean-code",
                    // "@babel/plugin-syntax-typescript",
                ].filter(Boolean),
            }),

            // getBabelOutputPlugin({ plugins: ["babel-plugin-clean-code"] }),
        ].filter(Boolean),
        build: {
            minify: "esbuild",
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2018",
            // terserOptions: {
            //     compress: { drop_console: true, drop_debugger: true },
            // },
        },
    };
});
