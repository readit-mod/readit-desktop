import { ipcMain } from "electron";
import { openPromptWindow } from "@main/handlers/pollyfills/prompt";
import { IPCEvents } from "@lib/common/ipc";

export function registerNativePolyfills() {
    ipcMain.handle(
        IPCEvents.Prompt,
        async (_event, { message, defaultValue }) => {
            return await openPromptWindow(message, defaultValue);
        },
    );
}
