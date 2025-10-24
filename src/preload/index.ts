import { contextBridge } from "electron";
import meta from "@/preload/meta";
import storageMethods from "@/preload/native/storage";
import networkMethods from "@/preload/native/network";
import loggingMethods from "@/preload/native/logging";
import bundleMethods from "@/preload/native/bundle";

let NativeAPI: ReadItNative = {
    ...meta,
    ...storageMethods,
    ...networkMethods,
    ...loggingMethods,
    ...bundleMethods,
};

contextBridge.exposeInMainWorld("ReadItNative", NativeAPI);
