import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig(({ mode, command }) => {
    console.log(mode, command);
    return {
        root: path.resolve(__dirname, "src"),
        plugins: [
            vuePlugin(),
            getBabelOutputPlugin({ plugins: ["babel-plugin-clean-code"] }),
            mode === "production" &&
                command === "build" &&
                babel({ plugins: ["babel-plugin-clean-code"] }),
        ].filter(Boolean),
        build: {
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2018",
            terserOptions: {
                compress: { drop_console: true, drop_debugger: true },
            },
        },
    };
});
