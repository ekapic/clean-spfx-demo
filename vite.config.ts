import { fileURLToPath, URL } from "url";
import { defineConfig } from "vitest/config";
import babel from "vite-plugin-babel";
import commonjs from "vite-plugin-commonjs";
import path from "path";

export default defineConfig({
  plugins: [
    babel({
      filter: /^.+\\.js$/,
      babelConfig: {
        plugins: ["transform-amd-to-commonjs"],
      },
    }),
    commonjs(),
  ],
  test: {
    setupFiles: "./vitest-setup.ts",
    environment: "jsdom",
    server: {
      deps: {
        inline: ["@pnp/spfx-controls-react"],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@ms/odsp-core-bundle",
        replacement: "identity-obj-proxy",
      },
      {
        find: "\\.(css|scss|resx)$",
        replacement: "identity-obj-proxy",
      },
      {
        find: "\\.(png|jpg)$",
        replacement: "./src/webparts/recentlyVisitedSites/tests/file-stub.ts",
      },
      {
        find: "RecentlyVisitedSitesWebPartStrings",
        replacement: path.resolve(
          __dirname,
          "./src/webparts/recentlyVisitedSites/loc/en-us.js"
        ),
      },
      {
        find: "ControlStrings",
        replacement: path.resolve(
          __dirname,
          "./node_modules/@pnp/spfx-controls-react/lib/loc/en-us.js"
        ),
      },
      //   {
      //     find: "@/",
      //     replacement: fileURLToPath(new URL("./", import.meta.url)),
      //   },
    ],
  },
});
