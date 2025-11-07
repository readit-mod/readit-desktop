import { writeLogEntry } from "@lib/common/logging";

export const logging = {
    info(...message: unknown[]) {
        console.log("[READIT NATIVE Info] ", ...message);
        const text = message
            .map((m) => {
                if (typeof m === "string") return m;
                try {
                    return JSON.stringify(m);
                } catch {
                    return String(m);
                }
            })
            .join(" ");

        writeLogEntry(`[READIT NATIVE Info] ${text}`);
    },
    warning(...message: unknown[]) {
        console.warn("[READIT NATIVE Warning] ", ...message);
        const text = message
            .map((m) => {
                if (typeof m === "string") return m;
                try {
                    return JSON.stringify(m);
                } catch {
                    return String(m);
                }
            })
            .join(" ");

        writeLogEntry(`[READIT NATIVE Warning] ${text}`);
    },
    error(...message: unknown[]) {
        console.error("[READIT NATIVE Error] ", ...message);
        const text = message
            .map((m) => {
                if (typeof m === "string") return m;
                try {
                    return JSON.stringify(m);
                } catch {
                    return String(m);
                }
            })
            .join(" ");

        writeLogEntry(`[READIT NATIVE Error] ${text}`);
    },
};
