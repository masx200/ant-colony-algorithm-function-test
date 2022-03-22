import { babel } from "@rollup/plugin-babel";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import ElementPlus from "unplugin-element-plus/vite";
import { defineConfig, UserConfigExport } from "vite";
import vpchecker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
//@ts-ignore
const checker = vpchecker.default;
// console.log(babel)
export default defineConfig(({ mode, command }) => {
    console.log(mode, command);
    const isdrop = mode === "production" && command === "build";
    const config: UserConfigExport = {
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
                sourceMaps: mode !== "production",
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
            createHtmlPlugin({
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeAttributeQuotes: false,
                },
            }),
            VitePWA({
                registerType: "autoUpdate",
                workbox: { globPatterns: ["*/*"] },
            }),
            // getBabelOutputPlugin({ plugins: ["babel-plugin-clean-code"] }),
        ],
        build: {
            cssCodeSplit: false,
            minify: "esbuild",
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2015",
            // terserOptions: {
            //     compress: { drop_console: true, drop_debugger: true },
            // },
        },
    };
    return config;
});
