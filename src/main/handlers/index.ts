import { BrowserWindow } from "electron";
import { registerNativePolyfills } from "./pollyfills";
import { registerBundleHandlers } from "./bundle";
import { registerNetworkHandlers } from "./network";
import { registerAppHandlers } from "./app";

export function registerHandlers(parent: BrowserWindow) {
    registerBundleHandlers();
    registerNativePolyfills(parent);
    registerNetworkHandlers(parent);
    registerAppHandlers(parent);
}
