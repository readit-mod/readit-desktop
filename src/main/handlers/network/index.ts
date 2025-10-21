import { ipcMain } from "electron";

export function registerNetworkHandlers() {
    ipcMain.handle(
        "native:xmlhttpRequest",
        async (_, details: RequestOptions) => {
            const res = await fetch(details.url, {
                method: details.method || "GET",
                headers: details.headers,
                body: details.body,
            });
            const text = await res.text();
            return {
                responseText: text,
                status: res.status,
                headers: Object.fromEntries(res.headers.entries()),
            };
        },
    );
}
