import { BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

export function setMainWindow(win: BrowserWindow) {
    mainWindow = win;
}

export function getMainWindow(): BrowserWindow {
    if (!mainWindow) {
        throw new Error("Main window has not been initialized yet.");
    }
    return mainWindow;
}

export function getMainWindowOrNull(): BrowserWindow | null {
    return mainWindow;
}
