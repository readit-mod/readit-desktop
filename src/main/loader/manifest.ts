import path from "path";
import { app } from "electron";
import fs from "fs";
import { storage } from "@lib/native/storage";
import { DEFAULT_MANIFEST_URL } from "@lib/constants";

export async function needsUpdate(): Promise<boolean> {
    let cached = getCachedManifest();
    if (!cached) return true;

    let remote = await getRemoteManifest();

    return cached?.version != remote.version;
}

function getCachedManifest(): BundleManifest | null {
    let caches = path.join(app.getPath("appData"), "cache");
    fs.mkdirSync(caches, { recursive: true });

    let cachedManifest = path.join(caches, "manifest.json");
    if (!fs.existsSync(cachedManifest)) return null;

    return JSON.parse(fs.readFileSync(cachedManifest, "utf-8"));
}

export async function getRemoteManifest(): Promise<BundleManifest> {
    let url = storage.get("ReadItManifestURL", DEFAULT_MANIFEST_URL);
    let res = await fetch(url);

    return JSON.parse(await res.text());
}
