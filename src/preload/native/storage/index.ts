import { storage } from "@lib/native/storage";

export default {
    storage: {
        getValue<T = unknown>(key: string, def: T | undefined) {
            return storage.get<T>(key, def!);
        },
        setValue<T>(key: string, value: T) {
            return storage.set<T>(key, value);
        },
        getAll() {
            return storage.all();
        },
    } satisfies StorageNative,
};
