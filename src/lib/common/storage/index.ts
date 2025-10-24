import fs from "fs";
import path from "path";
import { app } from "electron";

const storePath = path.join(app.getPath("userData"), "readit-store.json");

export function readStore() {
    if (!fs.existsSync(storePath)) return {};
    try {
        return JSON.parse(fs.readFileSync(storePath, "utf-8"));
    } catch {
        return {};
    }
}

export function writeStore(obj: any) {
    fs.writeFileSync(storePath, JSON.stringify(obj, null, 2));
}
