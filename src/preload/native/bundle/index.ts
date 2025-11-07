import { invoke, IPCEvents } from "@lib/common/ipc";

export default {
    bundle: {
        async setBundleManifest(url) {
            return await invoke<boolean>(IPCEvents.SetBundleManifest, url);
        },
        async getBundleManifest() {
            return await invoke<string>(IPCEvents.GetBundleManifest);
        },
        async resetBundleManifest() {
            return await invoke<boolean>(IPCEvents.ResetBundleManifest);
        },
    } satisfies BundleNative,
};
