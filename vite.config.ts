import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
    root: path.resolve(__dirname, "src"),
    plugins: [vuePlugin()],
    build: {
        target: "es2018",
        terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
        },
    },
});
