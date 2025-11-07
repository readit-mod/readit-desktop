import { IPCEvents } from "@lib/common/ipc";
import { ipcMain } from "electron";

export function registerNetworkHandlers() {
    ipcMain.handle(
        IPCEvents.XMLHTTPRequest,
        async (_, details: RequestOptions) => {
            try {
                const req = await fetch(details.url, {
                    method: details.method || "GET",
                    headers: details.headers,
                    body: details.body,
                });
                const text = await req.text();

                const res: RequestReturn = {
                    responseText: text,
                    status: req.status,
                    headers: Object.fromEntries(req.headers.entries()),
                };

                details.onload?.(res);

                return res;
            } catch (e) {
                details.onerror?.(e);
                return null;
            }
        },
    );
}
