import { invoke, IPCEvents } from "@lib/common/ipc";

export async function promptPolyfill(message: string, defaultValue = "") {
    return await invoke<Promise<string | null>>(IPCEvents.Prompt, {
        message,
        defaultValue,
    });
}
