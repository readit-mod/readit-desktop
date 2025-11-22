import { IPCEvents } from "@lib/common/ipc";
import { BrowserWindow, ipcMain } from "electron";
import { downloadURL } from "./download";

export function registerNetworkHandlers(win: BrowserWindow) {
    ipcMain.handle(IPCEvents.DownloadURL, (_, options) => {
        return downloadURL(win, options);
    });
}
