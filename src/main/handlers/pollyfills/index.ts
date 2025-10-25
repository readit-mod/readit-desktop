import { BrowserWindow, ipcMain } from "electron";
import { openPromptWindow } from "@/main/handlers/pollyfills/prompt";

export function registerNativePolyfills(mainWindow: BrowserWindow) {
    ipcMain.handle(
        "native:prompt",
        async (_event, { message, defaultValue }) => {
            return await openPromptWindow(mainWindow, message, defaultValue);
        },
    );
}
