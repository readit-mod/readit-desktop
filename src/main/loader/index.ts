import type { BrowserWindow } from "electron";
import { DEFAULT_BUNDLE_URL } from "@/lib/constants";
import { logging } from "@/lib/native/logging";
import { storage } from "@/lib/native/storage";

export async function loadReadItBundle(win: BrowserWindow) {
    let url = storage.get("ReadItBundleURL", DEFAULT_BUNDLE_URL);

    let res = await fetch(url, { cache: "no-store" });

    try {
        win.webContents.executeJavaScript(await res.text());
    } catch {
        logging.error("Failed to load bundle.");
    }
}
