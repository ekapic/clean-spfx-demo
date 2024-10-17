import { defineConfig, configDefaults } from "vitest/config";
import babel from "vite-plugin-babel";
import commonjs from "vite-plugin-commonjs";
import path from "path";
import { fileURLToPath } from "url";

const locStringPath = path.resolve(
  __dirname,
  "./src/webparts/recentlyVisitedSites/loc/en-us.js"
);
const locPnpStringPath = path.resolve(
  __dirname,
  "./node_modules/@pnp/spfx-controls-react/lib/loc/en-us.js"
);

export default defineConfig({
  plugins: [
    babel({
      filter: /\.(js|jsx)$/, // /\.jsx?$/, // /^.+\\.js$/,
      include: [
        locPnpStringPath,
        locStringPath,
        "@microsoft/sp-core-library",
        "@pnp/spfx-controls-react",
      ],
      babelConfig: {
        plugins: ["transform-amd-to-commonjs"],
      },
    }),
    commonjs({
      filter: (id) =>
        id.includes("en-us.js") ||
        id.includes("@pnp/spfx-controls-react") ||
        id.includes("@microsoft/sp-core-library"),
    }),
  ],
  test: {
    setupFiles: "./vitest-setup.ts",
    exclude: [...configDefaults.exclude, "lib", "dist"],
    environment: "jsdom",
    server: {
      deps: {
        inline: [
          "@pnp/spfx-controls-react",
          "@microsoft/sp-core-library",
          "en-us.js",
        ],
      },
      debug: {
        dumpModules: false,
        loadDumppedModules: false,
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
        find: /.*\.(?:scss|sass|css|resx)$/,
        replacement: "identity-obj-proxy",
        /*replacement: fileURLToPath(
          new URL(
            "./node_modules/identity-obj-proxy/src/index.js",
            import.meta.url
          )
        )*/
      },
      // {
      //   find: "\\.(png|jpg)$",
      //   replacement: path.resolve(
      //     __dirname,
      //     "./src/webparts/recentlyVisitedSites/tests/file-stub.ts"
      //   ),
      // },
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
