import { ipcMain } from "electron";
import { storage } from "@/lib/native/storage";
import { DEFAULT_BUNDLE_URL } from "@/lib/constants";

export function registerBundleHandlers() {
    ipcMain.handle("native:setBundleURL", (_, url: string) => {
        return storage.set("ReadItBundleURL", url);
    });

    ipcMain.handle("native:getBundleURL", (_) => {
        return storage.get("ReadItBundleURL", DEFAULT_BUNDLE_URL);
    });

    ipcMain.handle("native:resetBundleURL", (_) => {
        return storage.set("ReadItBundleURL", DEFAULT_BUNDLE_URL);
    });
}
