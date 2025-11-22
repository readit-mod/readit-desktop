import fs from "fs";
import path from "path";
import { fetchRemoteManifest } from "@main/loader/manifest";
import { logging } from "@lib/native/logging";
import { fetchRemoteBundle } from "@main/loader/bundle";
import { appDataPath } from "@lib/common/path";

let cachedBundleLocation = path.join(appDataPath, "cache", "readit.bundle.js");

let cachedManifestLocation = path.join(appDataPath, "cache", "manifest.json");

export function getCachedBundle(): string {
    return fs.readFileSync(cachedBundleLocation, "utf-8");
}

export async function getRemoteBundle(): Promise<string> {
    let manifestToCache = await fetchRemoteManifest();
    fs.writeFileSync(cachedManifestLocation, JSON.stringify(manifestToCache));
    let bundleToCache = await fetchRemoteBundle();
    fs.writeFileSync(cachedBundleLocation, bundleToCache);

    logging.info("Updated successfully.");

    return bundleToCache;
}
