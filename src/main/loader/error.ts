import { dialog } from "electron";
import { getMainWindow } from "@lib/main/win";
import { DEFAULT_MANIFEST_URL } from "@lib/constants";
import { storage } from "@lib/native/storage";
import { logging } from "@lib/native/logging";
import { capitalizeFirstLetter } from "@utils/string";

type LoaderError = "network" | "bundle";

export function loaderError(type: LoaderError, err: unknown) {
    const win = getMainWindow();
    const detail =
        err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : JSON.stringify(err, null, 2);

    logging.error(
        `LOADER Error\n Type: ${capitalizeFirstLetter(type)}\n Error: ${detail}`,
    );

    const res = dialog.showMessageBoxSync(win, {
        title: "ReadIt Loader Error",
        type: "error",
        message: `An error occurred during ${
            type === "network" ? "downloading" : "loading"
        } of the ReadIt bundle.`,
        detail,
        buttons: ["Retry", "Reset Bundle Manifest"],
    });

    switch (res) {
        case 0:
            win.webContents.reload();
            break;
        case 1:
            storage.set("ReadItManifestURL", DEFAULT_MANIFEST_URL);
            win.webContents.reload();
            break;
    }
}
