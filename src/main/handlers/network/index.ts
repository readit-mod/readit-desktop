import { IPCEvents } from "@lib/common/ipc";
import { ipcMain } from "electron";
import { downloadURL } from "./download";

export function registerNetworkHandlers() {
    ipcMain.handle(IPCEvents.DownloadURL, (_, options) => {
        return downloadURL(options);
    });
}
