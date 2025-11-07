import { ipcMain } from "electron";
import { writeLogEntry } from "@lib/common/logging";
import { IPCEvents } from "@lib/common/ipc";

export function registerLoggingHandlers() {
    ipcMain.handle(IPCEvents.Log, (_, log: string) => {
        writeLogEntry(log);
    });
}
