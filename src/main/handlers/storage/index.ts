import { ipcMain } from "electron";
import { writeStore, readStore } from "@lib/common/storage";

export function registerStoreHandlers() {
    ipcMain.handle("native:getAllValues", () => readStore());

    ipcMain.handle("native:getValue", (_, key: string, def?: any) => {
        const store = readStore();
        return key in store ? store[key] : def;
    });

    ipcMain.handle("native:setValue", (_, key: string, val: any) => {
        const store = readStore();
        store[key] = val;
        writeStore(store);
        return true;
    });
}
