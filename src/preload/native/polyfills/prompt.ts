import { ipcRenderer } from "electron";

export async function promptPolyfill(message: string, defaultValue = "") {
    return await ipcRenderer.invoke("native:prompt", {
        message,
        defaultValue,
    });
}
