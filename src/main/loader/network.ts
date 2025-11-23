import { loaderError } from "@main/loader/error";

export async function fetchCatching(url: string): Promise<string> {
    let res: Response;

    try {
        res = await fetch(url);
    } catch (networkError) {
        loaderError("network", networkError);
        throw networkError;
    }

    if (!res.ok) {
        let bodyText: string;
        try {
            bodyText = await res.text();
        } catch {
            bodyText = "<failed to read body>";
        }

        const err = new Error(
            `Fetch error, code: ${res.status}, body: ${bodyText}`,
        );
        loaderError("network", err);
        throw err;
    }

    return res.text();
}
