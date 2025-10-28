import type { BrowserWindow } from "electron";
import { logging } from "@/lib/native/logging";
import { needsUpdate } from "@/main/loader/manifest";
import { getCachedBundle, getRemoteBundle } from "@/main/loader/cache";
import { injectReadItBundle } from "@/main/loader/inject";

export async function loadReadItBundle(win: BrowserWindow) {
    let shouldUpdate = await needsUpdate();

    let bundle: string;
    if (shouldUpdate) {
        // This will also cache the bundle it fetches.
        logging.info("New bundle available, fetching.");
        bundle = await getRemoteBundle();
    } else {
        logging.info("No new bundle, loading cache.");
        bundle = getCachedBundle();
    }

    injectReadItBundle(bundle, win);
}
