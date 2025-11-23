import { IPCEvents } from "@lib/common/ipc";
import { BrowserWindow, ipcMain } from "electron";

export function registerAppHandlers(win: BrowserWindow) {
    ipcMain.handle(IPCEvents.OpenDevtools, (_) => {
        win.webContents.openDevTools();
    });
}
