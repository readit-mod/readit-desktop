import { ipcMain } from "electron";
import { writeStore, readStore } from "@lib/common/storage";
import { IPCEvents } from "@lib/common/ipc";

export function registerStoreHandlers() {
    ipcMain.handle(IPCEvents.GetAllStorageValues, () => readStore());

    ipcMain.handle(IPCEvents.GetStorageValue, (_, key: string, def?: any) => {
        const store = readStore();
        return key in store ? store[key] : def;
    });

    ipcMain.handle(IPCEvents.SetStorageValue, (_, key: string, val: any) => {
        const store = readStore();
        store[key] = val;
        writeStore(store);
        return true;
    });
}
