import { ipcRenderer } from "electron";

export default {
    storage: {
        async getValue(key, def) {
            return ipcRenderer.invoke("native:getValue", key, def);
        },
        async setValue(key, value) {
            return ipcRenderer.invoke("native:setValue", key, value);
        },
        async getAll() {
            return ipcRenderer.invoke("native:getAllValues");
        },
    } as StorageNative,
};
