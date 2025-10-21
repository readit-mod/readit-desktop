import { app, BrowserWindow } from "electron";
import path from "path";
import https from "https";
import { registerHandlers } from "@/main/handlers";

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

    registerHandlers();

    win.loadURL("https://reddit.com");

    win.webContents.on("did-finish-load", () => {
        let url = "https://storage.tralwdwd.dev/readit.bundle.js";

        https.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => (data += chunk));
            res.on("end", async () => {
                try {
                    await win.webContents.executeJavaScript(data);
                } catch {
                    console.log("Load failed.");
                }
            });
        });
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
