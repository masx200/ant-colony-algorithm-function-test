import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig(({ mode, command }) => {
    console.log(mode, command);
    return {
        esbuild: { drop: ["console", "debugger"] },
        root: path.resolve(__dirname, "src"),
        plugins: [
            // mode === "production" &&
            //     command === "build" &&
            //     babel({
            //         extensions: [".ts", ".js"],
            //         plugins: [
            //             "babel-plugin-clean-code",
            //             "@babel/plugin-syntax-typescript",
            //         ],
            //     }),
            vuePlugin(),

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
