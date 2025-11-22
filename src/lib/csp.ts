import type { BrowserWindow } from "electron";

export function disableCsp(win: BrowserWindow) {
    const ses = win.webContents.session;

    ses.webRequest.onHeadersReceived(
        { urls: ["<all_urls>"] },
        (details, callback) => {
            const headers = { ...details.responseHeaders };
            for (const key of Object.keys(headers)) {
                if (
                    key.toLowerCase() === "content-security-policy" ||
                    key.toLowerCase() === "content-security-policy-report-only"
                ) {
                    delete headers[key];
                }
            }
            callback({ responseHeaders: headers });
        },
    );

    ses.webRequest.onCompleted({ urls: ["<all_urls>"] }, () => {
        win.webContents
            .executeJavaScript(
                `
            if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
                let meta = document.createElement('meta');
                meta.httpEquiv = 'Content-Security-Policy';
                meta.content = '';
                document.head.prepend(meta);
            }
        `,
            )
            .catch(() => {});
    });
}
