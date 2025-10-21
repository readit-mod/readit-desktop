import { contextBridge } from "electron";
import meta from "@/preload/meta";
import storageMethods from "@/preload/native/storage";
import networkMethods from "@/preload/native/network";
import loggingMethods from "@/preload/native/logging";

let NativeAPI: ReadItNative = {
    ...meta,
    ...storageMethods,
    ...networkMethods,
    ...loggingMethods,
};

contextBridge.exposeInMainWorld("ReadItNative", NativeAPI);
