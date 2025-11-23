import { registerNativePolyfills } from "./pollyfills";
import { registerBundleHandlers } from "./bundle";
import { registerNetworkHandlers } from "./network";
import { registerAppHandlers } from "./app";

export function registerHandlers() {
    registerBundleHandlers();
    registerNativePolyfills();
    registerNetworkHandlers();
    registerAppHandlers();
}
