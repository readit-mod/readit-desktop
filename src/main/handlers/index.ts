import { registerNativePolyfills } from "./pollyfills";
import { registerBundleHandlers } from "./bundle";
import { BrowserWindow } from "electron";

export function registerHandlers(parent: BrowserWindow) {
    registerBundleHandlers();
    registerNativePolyfills(parent);
}
