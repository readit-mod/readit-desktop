const path = require("path");
const fs = require("fs");
const packager = require("electron-packager");
const { createWindowsInstaller } = require("electron-winstaller");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const stagingDir = path.join(distDir, "staging");
const buildDir = path.join(distDir, "build");

const pkg = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf-8"),
);
const appName = pkg.productName || pkg.name;
const version = pkg.version;

async function main() {
    console.log("Cleaning previous packaged builds...");
    fs.rmSync(buildDir, { recursive: true, force: true });
    fs.rmSync(stagingDir, { recursive: true, force: true });

    console.log("Preparing staging folder...");
    fs.mkdirSync(stagingDir, { recursive: true });

    fs.copyFileSync(
        path.join(distDir, "main.js"),
        path.join(stagingDir, "main.js"),
    );

    fs.copyFileSync(
        path.join(distDir, "preload.js"),
        path.join(stagingDir, "preload.js"),
    );

    fs.copyFileSync(
        path.join(root, "package.json"),
        path.join(stagingDir, "package.json"),
    );

    console.log("Packaging app with electron-packager...");

    const appPaths = await packager({
        dir: stagingDir,
        out: buildDir,
        overwrite: true,
        platform: "win32",
        arch: "x64",
        icon: path.join(root, "assets", "icon.ico"),
        asar: true,
        prune: true,
        appVersion: version,
        name: appName,
        ignore: [/\.map$/, /^\/build/, /^\/installer/],
    });

    const appPath = appPaths[0];
    console.log(`Packaged app at: ${appPath}`);

    console.log("Creating Windows installer with electron-winstaller...");

    const installerDir = path.join(distDir, "installer");
    fs.mkdirSync(installerDir, { recursive: true });

    await createWindowsInstaller({
        appDirectory: appPath,
        outputDirectory: installerDir,
        authors: pkg.author || "Unknown",
        exe: `${appName}.exe`,
        setupExe: `${appName}.setup.${version}.exe`,
        noMsi: true,
        setupIcon: path.join(root, "assets", "icon.ico"),
        description: pkg.description || appName,
        iconUrl:
            "https://www.redditstatic.com/shreddit/assets/favicon/152x152.png",
    });

    console.log(
        `Installer created at: ${path.join(installerDir, `${appName}.setup.${version}.exe`)}`,
    );
}

main().catch((err) => {
    console.error("Build failed:", err);
    process.exit(1);
});
