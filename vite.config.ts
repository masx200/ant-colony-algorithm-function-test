import { babel } from "@rollup/plugin-babel";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import ElementPlus from "unplugin-element-plus/vite";
import { defineConfig } from "vite";
import vpchecker from "vite-plugin-checker";
//@ts-ignore
const checker = vpchecker.default;
// console.log(babel)
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
            checker({ typescript: { root: path.resolve(__dirname) } }),
            checker({ vueTsc: true }),

            ElementPlus({
                // options
            }),
            vuePlugin(),
            // mode === "production" &&
            //     command === "build" &&
            babel({
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],
                //@ts-ignore
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
