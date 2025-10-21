import { ipcRenderer } from "electron";

export default {
    network: {
        async xmlHttpRequest(options) {
            return ipcRenderer.invoke("native:xmlhttpRequest", options);
        },
    } as NetworkNative,
};
