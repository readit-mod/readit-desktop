import { registerLoggingHandlers } from "@/main/handlers/logging";
import { registerNetworkHandlers } from "@/main/handlers/network";
import { registerStoreHandlers } from "@/main/handlers/storage";
import { registerNativePolyfills } from "./pollyfills";
import { registerBundleHandlers } from "./bundle";
import { BrowserWindow } from "electron";

export function registerHandlers(parent: BrowserWindow) {
    registerLoggingHandlers();
    registerNetworkHandlers();
    registerStoreHandlers();
    registerBundleHandlers();
    registerNativePolyfills(parent);
}
