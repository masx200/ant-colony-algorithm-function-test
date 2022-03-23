// vite.config.ts
import { babel } from "@rollup/plugin-babel";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import ElementPlus from "unplugin-element-plus/vite";
import { defineConfig } from "vite";
import vpchecker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
var checker = vpchecker.default;
var vite_config_default = defineConfig(({ mode, command }) => {
  console.log(mode, command);
  const isdrop = mode === "production" && command === "build";
  const config = {
    esbuild: {
      legalComments: "none",
      drop: isdrop ? ["console", "debugger"] : void 0
    },
    root: path.resolve("C:\\Documents\\gitee\\ant-colony-algorithm-function-test", "src"),
    plugins: [
      checker({ typescript: { root: path.resolve("C:\\Documents\\gitee\\ant-colony-algorithm-function-test") } }),
      checker({ vueTsc: true }),
      ElementPlus({}),
      vuePlugin(),
      babel({
        sourceMaps: mode !== "production",
        exclude: [/node_modules/],
        extensions: [".ts", ".js"],
        plugins: [
          [
            "babel-plugin-import",
            {
              libraryName: "lodash",
              libraryDirectory: "",
              camel2DashComponentName: false
            }
          ],
          isdrop && "babel-plugin-clean-code"
        ].filter(Boolean)
      }),
      createHtmlPlugin({
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: false
        }
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: { globPatterns: ["*/*"] }
      })
    ],
    build: {
      cssCodeSplit: false,
      minify: "esbuild",
      emptyOutDir: true,
      outDir: path.resolve("C:\\Documents\\gitee\\ant-colony-algorithm-function-test", "dist"),
      target: "es2015"
    }
  };
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGJhYmVsIH0gZnJvbSBcIkByb2xsdXAvcGx1Z2luLWJhYmVsXCI7XG5pbXBvcnQgdnVlUGx1Z2luIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgRWxlbWVudFBsdXMgZnJvbSBcInVucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIFVzZXJDb25maWdFeHBvcnQgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZwY2hlY2tlciBmcm9tIFwidml0ZS1wbHVnaW4tY2hlY2tlclwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuLy9AdHMtaWdub3JlXG5jb25zdCBjaGVja2VyID0gdnBjaGVja2VyLmRlZmF1bHQ7XG4vLyBjb25zb2xlLmxvZyhiYWJlbClcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhtb2RlLCBjb21tYW5kKTtcbiAgICBjb25zdCBpc2Ryb3AgPSBtb2RlID09PSBcInByb2R1Y3Rpb25cIiAmJiBjb21tYW5kID09PSBcImJ1aWxkXCI7XG4gICAgY29uc3QgY29uZmlnOiBVc2VyQ29uZmlnRXhwb3J0ID0ge1xuICAgICAgICBlc2J1aWxkOiB7XG4gICAgICAgICAgICBsZWdhbENvbW1lbnRzOiBcIm5vbmVcIixcbiAgICAgICAgICAgIGRyb3A6IGlzZHJvcCA/IFtcImNvbnNvbGVcIiwgXCJkZWJ1Z2dlclwiXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKFwiQzpcXFxcRG9jdW1lbnRzXFxcXGdpdGVlXFxcXGFudC1jb2xvbnktYWxnb3JpdGhtLWZ1bmN0aW9uLXRlc3RcIiwgXCJzcmNcIiksXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIGNoZWNrZXIoeyB0eXBlc2NyaXB0OiB7IHJvb3Q6IHBhdGgucmVzb2x2ZShcIkM6XFxcXERvY3VtZW50c1xcXFxnaXRlZVxcXFxhbnQtY29sb255LWFsZ29yaXRobS1mdW5jdGlvbi10ZXN0XCIpIH0gfSksXG4gICAgICAgICAgICBjaGVja2VyKHsgdnVlVHNjOiB0cnVlIH0pLFxuXG4gICAgICAgICAgICBFbGVtZW50UGx1cyh7XG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2dWVQbHVnaW4oKSxcbiAgICAgICAgICAgIC8vIG1vZGUgPT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAvLyAgICAgY29tbWFuZCA9PT0gXCJidWlsZFwiICYmXG4gICAgICAgICAgICBiYWJlbCh7XG4gICAgICAgICAgICAgICAgc291cmNlTWFwczogbW9kZSAhPT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgZXhjbHVkZTogWy9ub2RlX21vZHVsZXMvXSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbXCIudHNcIiwgXCIuanNcIl0sXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhYmVsLXBsdWdpbi1pbXBvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5TmFtZTogXCJsb2Rhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5RGlyZWN0b3J5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVsMkRhc2hDb21wb25lbnROYW1lOiBmYWxzZSwgLy8gZGVmYXVsdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgaXNkcm9wICYmIFwiYmFiZWwtcGx1Z2luLWNsZWFuLWNvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJAYmFiZWwvcGx1Z2luLXN5bnRheC10eXBlc2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgXS5maWx0ZXIoQm9vbGVhbiksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICAgICAgICAgIG1pbmlmeToge1xuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZVdoaXRlc3BhY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGVRdW90ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIFZpdGVQV0Eoe1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgd29ya2JveDogeyBnbG9iUGF0dGVybnM6IFtcIiovKlwiXSB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBnZXRCYWJlbE91dHB1dFBsdWdpbih7IHBsdWdpbnM6IFtcImJhYmVsLXBsdWdpbi1jbGVhbi1jb2RlXCJdIH0pLFxuICAgICAgICBdLFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICAgICAgICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXG4gICAgICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgICAgICAgIG91dERpcjogcGF0aC5yZXNvbHZlKFwiQzpcXFxcRG9jdW1lbnRzXFxcXGdpdGVlXFxcXGFudC1jb2xvbnktYWxnb3JpdGhtLWZ1bmN0aW9uLXRlc3RcIiwgXCJkaXN0XCIpLFxuICAgICAgICAgICAgdGFyZ2V0OiBcImVzMjAxNVwiLFxuICAgICAgICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgICAgICAgICAgLy8gICAgIGNvbXByZXNzOiB7IGRyb3BfY29uc29sZTogdHJ1ZSwgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSB9LFxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBjb25maWc7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTSxVQUFVLFVBQVU7QUFFMUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxNQUFNLGNBQWM7QUFDL0MsVUFBUSxJQUFJLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZ0JBQWdCLFlBQVk7QUFDcEQsUUFBTSxTQUEyQjtBQUFBLElBQzdCLFNBQVM7QUFBQSxNQUNMLGVBQWU7QUFBQSxNQUNmLE1BQU0sU0FBUyxDQUFDLFdBQVcsY0FBYztBQUFBO0FBQUEsSUFFN0MsTUFBTSxLQUFLLFFBQVEsNERBQTREO0FBQUEsSUFDL0UsU0FBUztBQUFBLE1BQ0wsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLEtBQUssUUFBUTtBQUFBLE1BQzNDLFFBQVEsRUFBRSxRQUFRO0FBQUEsTUFFbEIsWUFBWTtBQUFBLE1BR1o7QUFBQSxNQUdBLE1BQU07QUFBQSxRQUNGLFlBQVksU0FBUztBQUFBLFFBQ3JCLFNBQVMsQ0FBQztBQUFBLFFBQ1YsWUFBWSxDQUFDLE9BQU87QUFBQSxRQUVwQixTQUFTO0FBQUEsVUFDTDtBQUFBLFlBQ0k7QUFBQSxZQUNBO0FBQUEsY0FDSSxhQUFhO0FBQUEsY0FDYixrQkFBa0I7QUFBQSxjQUNsQix5QkFBeUI7QUFBQTtBQUFBO0FBQUEsVUFHakMsVUFBVTtBQUFBLFVBRVosT0FBTztBQUFBO0FBQUEsTUFFYixpQkFBaUI7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNKLG9CQUFvQjtBQUFBLFVBQ3BCLGdCQUFnQjtBQUFBLFVBQ2hCLHVCQUF1QjtBQUFBO0FBQUE7QUFBQSxNQUcvQixRQUFRO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxTQUFTLEVBQUUsY0FBYyxDQUFDO0FBQUE7QUFBQTtBQUFBLElBSWxDLE9BQU87QUFBQSxNQUNILGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQVEsS0FBSyxRQUFRLDREQUE0RDtBQUFBLE1BQ2pGLFFBQVE7QUFBQTtBQUFBO0FBTWhCLFNBQU87QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
