import path from "path";
import fs from "fs";
import { storage } from "@lib/native/storage";
import { DEFAULT_MANIFEST_URL } from "@lib/constants";
import { appDataPath } from "@lib/common/path";
import { fetchCatching } from "@main/loader/network";

export async function needsUpdate(): Promise<boolean> {
    let cached = getCachedManifest();
    if (!cached) return true;

    let remote = await fetchRemoteManifest();

    return cached?.version != remote.version;
}

function getCachedManifest(): BundleManifest | null {
    let caches = path.join(appDataPath, "cache");
    fs.mkdirSync(caches, { recursive: true });

    let cachedManifest = path.join(caches, "manifest.json");
    if (!fs.existsSync(cachedManifest)) return null;

    return JSON.parse(fs.readFileSync(cachedManifest, "utf-8"));
}

export async function fetchRemoteManifest(): Promise<BundleManifest> {
    const url = storage.get("ReadItManifestURL", DEFAULT_MANIFEST_URL);

    const text = await fetchCatching(url);

    return JSON.parse(text) as BundleManifest;
}
