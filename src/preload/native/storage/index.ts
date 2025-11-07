import { invoke, IPCEvents } from "@lib/common/ipc";

export default {
    storage: {
        async getValue<T = unknown>(key: string, def: T | undefined) {
            return invoke<T>(IPCEvents.GetStorageValue, key, def);
        },
        async setValue<T>(key: string, value: T) {
            return invoke<boolean>(IPCEvents.SetStorageValue, key, value);
        },
        async getAll() {
            return invoke<Record<string, any>>(IPCEvents.GetAllStorageValues);
        },
    } satisfies StorageNative,
};
