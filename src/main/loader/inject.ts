import type { BrowserWindow } from "electron";
import { logging } from "@/lib/native/logging";

export function injectReadItBundle(bundle: string, win: BrowserWindow) {
    try {
        win.webContents.executeJavaScript(bundle);
    } catch (e) {
        logging.error("An error occured while loading ReadIt. ", e);
    }
}
