import { ipcMain } from "electron";
import { writeLogEntry } from "@lib/common/logging";

export function registerLoggingHandlers() {
    ipcMain.handle("native:log", (_, log: string) => {
        writeLogEntry(log);
    });
}
