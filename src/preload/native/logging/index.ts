import { ipcRenderer } from "electron";

export default {
    logging: {
        async log(log) {
            ipcRenderer.invoke("native:log", log);
        },
    } as LogNative,
};
