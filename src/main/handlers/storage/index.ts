import { ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { app } from "electron";

const storePath = path.join(app.getPath("userData"), "readit-store.json");

function readStore() {
    if (!fs.existsSync(storePath)) return {};
    try {
        return JSON.parse(fs.readFileSync(storePath, "utf-8"));
    } catch {
        return {};
    }
}

function writeStore(obj: any) {
    fs.writeFileSync(storePath, JSON.stringify(obj, null, 2));
}

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
