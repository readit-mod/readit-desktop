import fs from "fs";
import path from "path";
import { app } from "electron";
import { getRemoteManifest } from "@/main/loader/manifest";
import { DEFAULT_BUNDLE_URL } from "@/lib/constants";
import { logging } from "@/lib/native/logging";

let cachedBundleLocation = path.join(
    app.getPath("appData"),
    "cache",
    "readit.bundle.js",
);

let cachedManifestLocation = path.join(
    app.getPath("appData"),
    "cache",
    "manifest.json",
);

export function getCachedBundle(): string {
    return fs.readFileSync(cachedBundleLocation, "utf-8");
}

export async function getRemoteBundle(): Promise<string> {
    let manifestToCache = await getRemoteManifest();
    fs.writeFileSync(cachedManifestLocation, JSON.stringify(manifestToCache));
    let bundleToCache = await (await fetch(DEFAULT_BUNDLE_URL)).text();
    fs.writeFileSync(cachedBundleLocation, bundleToCache);

    logging.info("Updated successfully.");

    return bundleToCache;
}
