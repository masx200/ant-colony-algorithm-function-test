import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import path from "path";
export default defineConfig({
    root: path.resolve(__dirname, "src"),
    plugins: [
        vuePlugin(),
        getBabelOutputPlugin({ plugins: ["babel-plugin-clean-code"] }),
    ],
    build: {
        emptyOutDir: true,
        outDir: path.resolve(__dirname, "dist"),
        target: "es2018",
        terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
        },
    },
});
