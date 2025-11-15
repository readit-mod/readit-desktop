import { XMLHttpRequest } from "w3c-xmlhttprequest";

export default {
    network: {
        XMLHttpRequest,
        fetch,
    } satisfies NetworkNative,
};
