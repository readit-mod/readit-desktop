type ReadItNative = {
    meta: ReadItMeta;
    storage: StorageNative;
    network: NetworkNative;
    logging: LogNative;
    bundle: BundleNative;
    polyfills?: Polyfill[];
};

type LogNative = {
    log: (log: string) => Promise<void>;
};

type StorageNative = {
    getValue: <T = unknown>(key: string, def?: T) => Promise<T>;
    setValue: <T = unknown>(key: string, value: T) => Promise<boolean>;
    getAll: () => Promise<Record<string, any>>;
};

type NetworkNative = {
    xmlHttpRequest: (options: RequestOptions) => Promise<RequestReturn | null>;
};

type BundleNative = {
    setBundleManifest: (url: string) => Promise<boolean>;
    getBundleManifest: () => Promise<string>;
    resetBundleManifest: () => Promise<boolean>;
};

type Polyfill = {
    object: string;
    replacements: Record<string, any>;
};

type RequestOptions = {
    url: string;
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
    onload?: (res: RequestReturn) => void;
    onerror?: (res: any) => void;
};

type RequestReturn = {
    responseText?: string;
    status?: number;
    headers?: {
        [k: string]: string;
    };
};

type BundleManifest = {
    version: string;
};

type ReadItMeta = {
    loaderVersion: string;
    platform: string;
};
