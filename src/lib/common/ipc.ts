import { ipcRenderer } from "electron";

export function invoke<R>(event: IPCEvents, ...args: any[]): Promise<R> {
    return ipcRenderer.invoke(event, ...args);
}

export enum IPCEvents {
    SetBundleManifest = "native:setManifestURL",
    GetBundleManifest = "native:getManifestURL",
    ResetBundleManifest = "native:resetManifestURL",
    Prompt = "native:prompt",
    DownloadURL = "native:downloadUrl",
}
