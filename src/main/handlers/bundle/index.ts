import { ipcMain } from "electron";
import { storage } from "@lib/native/storage";
import { DEFAULT_MANIFEST_URL } from "@lib/constants";
import { IPCEvents } from "@lib/common/ipc";

export function registerBundleHandlers() {
    ipcMain.handle(IPCEvents.SetBundleManifest, (_, url: string) => {
        return storage.set("ReadItManifestURL", url);
    });

    ipcMain.handle(IPCEvents.GetBundleManifest, (_) => {
        return storage.get("ReadItManifestURL", DEFAULT_MANIFEST_URL);
    });

    ipcMain.handle(IPCEvents.ResetBundleManifest, (_) => {
        return storage.set("ReadItManifestURL", DEFAULT_MANIFEST_URL);
    });
}
