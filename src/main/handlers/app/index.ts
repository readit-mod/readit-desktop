import { IPCEvents } from "@lib/common/ipc";
import { getMainWindow } from "@lib/main/win";
import { ipcMain } from "electron";

export function registerAppHandlers() {
    ipcMain.handle(IPCEvents.OpenDevtools, (_) => {
        getMainWindow().webContents.openDevTools();
    });
}
