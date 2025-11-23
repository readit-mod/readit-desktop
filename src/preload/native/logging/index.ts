import { writeLogEntry } from "@lib/common/logging";

export default {
    logging: {
        async log(log) {
            writeLogEntry(log);
        },
    } satisfies LogNative,
};
