import { loaderError } from "@main/loader/error";
import { getMainWindow } from "@lib/main/win";

export function injectReadItBundle(bundle: string) {
    try {
        getMainWindow().webContents.executeJavaScript(bundle);
    } catch (e) {
        loaderError("bundle", e);
    }
}
