import { invoke, IPCEvents } from "@lib/common/ipc";
import { ipcRenderer } from "electron";

export default {
    network: {
        async xmlHttpRequest(options) {
            return invoke<RequestReturn | null>(
                IPCEvents.XMLHTTPRequest,
                options,
            );
        },
    } satisfies NetworkNative,
};
