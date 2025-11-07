import { invoke, IPCEvents } from "@lib/common/ipc";

export default {
    logging: {
        async log(log) {
            invoke<void>(IPCEvents.Log, log);
        },
    } satisfies LogNative,
};
