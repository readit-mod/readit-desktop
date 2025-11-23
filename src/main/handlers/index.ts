import { registerNativePolyfills } from "./pollyfills";
import { registerBundleHandlers } from "./bundle";
import { BrowserWindow } from "electron";
import { registerNetworkHandlers } from "./network";

export function registerHandlers(parent: BrowserWindow) {
    registerBundleHandlers();
    registerNativePolyfills(parent);
    registerNetworkHandlers(parent);
}
