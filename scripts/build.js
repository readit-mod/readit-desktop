#!/usr/bin/env node

const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const { builtinModules } = require("module");

const watch = process.argv.includes("watch");

const outDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const common = {
    bundle: true,
    minify: false,
    sourcemap: false,
    platform: "node",
};

esbuild
    .build({
        ...common,
        entryPoints: [path.resolve(__dirname, "../src/main/index.ts")],
        outfile: path.join(outDir, "main.js"),
        external: ["electron"]
    })
    .then(() => console.log("Main process built"));

esbuild
    .build({
        ...common,
        entryPoints: [path.resolve(__dirname, "../src/preload/index.ts")],
        outfile: path.join(outDir, "preload.js"),
        format: "cjs",
        external: [
            ...builtinModules,
            "electron"
        ],
        define: {
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development",
            ),
        },
    })
    .then(() => console.log("Preload script built"));
