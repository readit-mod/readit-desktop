import { invoke, IPCEvents } from "@lib/common/ipc";

export default {
    network: {
        fetch,
        async downloadUrl(options) {
            return await invoke<void>(IPCEvents.DownloadURL, options);
        },
    } satisfies NetworkNative,
};
