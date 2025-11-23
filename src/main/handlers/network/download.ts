import { BrowserWindow, dialog } from "electron";

export function downloadURL(win: BrowserWindow, options: DownloadOptions) {
    let save = dialog.showSaveDialogSync(win, {
        title: options.title,
        defaultPath: options.name,
        message: options.message,
        buttonLabel: options.buttonLabel,
        filters: options.filters,
    });

    if (!save) return;

    win.webContents.downloadURL(options.url);

    win.webContents.session.once("will-download", (_, item) => {
        item.setSavePath(save);

        item.once("done", (_, state) => {
            if (state !== "completed") {
                dialog.showErrorBox(
                    "Download Error",
                    "There was an error during the download.",
                );
            }
        });
    });
}
