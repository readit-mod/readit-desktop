import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { registerHandlers } from "@main/handlers";
import { loadReadItBundle } from "@main/loader";

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    registerHandlers(win);
    win.loadURL("https://reddit.com");

    ipcMain.on("retry-load", (_) => {
        win.loadURL("https://reddit.com");
    });

    win.webContents.on("did-finish-load", () => {
        loadReadItBundle(win);
    });

    win.webContents.on("did-fail-load", () => {
        win.loadURL("https://storage.tralwdwd.dev/fallback.html");
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
