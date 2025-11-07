import { writeStore, readStore } from "@lib/common/storage";

export const storage = {
    get<T>(key: string, def: T): T {
        const store = readStore();
        return key in store ? store[key] : def;
    },
    set<T>(key: string, value: T): boolean {
        const store = readStore();
        store[key] = value;
        writeStore(store);
        return true;
    },
};
