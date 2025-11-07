import { promptPolyfill } from "./prompt";

export default {
    polyfills: [
        {
            object: "window",
            replacements: {
                prompt: promptPolyfill,
            },
        },
    ] satisfies Polyfill[],
};
