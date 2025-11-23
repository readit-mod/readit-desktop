import { invoke, IPCEvents } from "@lib/common/ipc";

export default {
    app: {
        async openDevtools() {
            invoke<void>(IPCEvents.OpenDevtools);
        },
    } satisfies AppNative,
};
