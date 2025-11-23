import { DEFAULT_MANIFEST_URL } from "@lib/constants";
import { storage } from "@lib/native/storage";
import { fetchCatching } from "./network";

export async function fetchRemoteBundle(): Promise<string> {
    let manifestURL = storage.get("ReadItManifestURL", DEFAULT_MANIFEST_URL);
    let bundleURL = new URL("readit.bundle.js", manifestURL).href;

    let text = await fetchCatching(bundleURL);

    return text;
}
