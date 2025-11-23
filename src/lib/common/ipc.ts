import { ipcRenderer } from "electron";

export function invoke<R>(event: IPCEvents, ...args: any[]): Promise<R> {
    return ipcRenderer.invoke(event, ...args);
}

export function sendSync<R>(event: IPCEvents, ...args: any[]): R {
    return ipcRenderer.sendSync(event, ...args) as R;
}

export enum IPCEvents {
    SetBundleManifest = "native:setManifestURL",
    GetBundleManifest = "native:getManifestURL",
    ResetBundleManifest = "native:resetManifestURL",
    Prompt = "native:prompt",
    DownloadURL = "native:downloadUrl",
    OpenDevtools = "native:openDevtools",
}
