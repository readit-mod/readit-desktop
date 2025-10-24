import { ipcRenderer } from "electron";

export default {
    bundle: {
        async setBundleURL(url) {
            return await ipcRenderer.invoke("native:setBundleURL", url);
        },
        async getBundleURL() {
            return await ipcRenderer.invoke("native:getBundleURL");
        },
        async resetBundleURL() {
            return await ipcRenderer.invoke("native:resetrBundleURL");
        },
    } as BundleNative,
};
