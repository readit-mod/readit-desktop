import fs from "node:fs";
import { join, dirname } from "path";
import { formatDate } from "@/utils/format";
import { app } from "electron";

const logPath = join(
    app.getPath("userData"),
    "logs",
    `${formatDate(new Date())}.log`,
);

export function writeLogEntry(entry: string) {
    fs.mkdirSync(dirname(logPath), { recursive: true });
    if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
    fs.appendFileSync(logPath, `[${new Date().toISOString()}]${entry}\n`);
}
