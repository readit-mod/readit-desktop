import appData from "appdata-path";

let _path = "";

export const appDataPath = (() => {
    if (!_path) _path = appData("readit-desktop");
    return _path;
})();
