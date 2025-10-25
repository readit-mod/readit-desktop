import { contextBridge, ipcRenderer } from "electron";
import meta from "@/preload/meta";
import storageMethods from "@/preload/native/storage";
import networkMethods from "@/preload/native/network";
import loggingMethods from "@/preload/native/logging";
import bundleMethods from "@/preload/native/bundle";
import nativePolyfills from "@/preload/native/polyfills";

let NativeAPI: ReadItNative = {
    ...meta,
    ...storageMethods,
    ...networkMethods,
    ...loggingMethods,
    ...bundleMethods,
    ...nativePolyfills,
};

contextBridge.exposeInMainWorld("ReadItNative", NativeAPI);

contextBridge.exposeInMainWorld("reddit", {
    reload: () => ipcRenderer.send("retry-load"),
});
