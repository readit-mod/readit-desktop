import { ipcMain } from "electron";
import { storage } from "@lib/native/storage";
import { DEFAULT_BUNDLE_URL } from "@lib/constants";
import { IPCEvents } from "@lib/common/ipc";

export function registerBundleHandlers() {
    ipcMain.handle(IPCEvents.SetBundleManifest, (_, url: string) => {
        return storage.set("ReadItBundleURL", url);
    });

    ipcMain.handle(IPCEvents.GetBundleManifest, (_) => {
        return storage.get("ReadItBundleURL", DEFAULT_BUNDLE_URL);
    });

    ipcMain.handle(IPCEvents.SetBundleManifest, (_) => {
        return storage.set("ReadItBundleURL", DEFAULT_BUNDLE_URL);
    });
}
