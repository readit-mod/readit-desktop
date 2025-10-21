import { ipcMain } from "electron";
import fs from "fs";
import { dirname, join } from "path";
import { app } from "electron";
import { formatDate } from "@/utils/format";

const logPath = join(
    app.getPath("userData"),
    "logs",
    `${formatDate(new Date())}.log`,
);

function writeLogEntry(entry: string) {
    fs.mkdirSync(dirname(logPath), { recursive: true });
    if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
    fs.appendFileSync(logPath, `[${new Date().toISOString()}]${entry}\n`);
}

export function registerLoggingHandlers() {
    ipcMain.handle("native:log", (_, log: string) => {
        writeLogEntry(log);
    });
}
