import { BrowserWindow, ipcMain } from "electron";

export async function openPromptWindow(
    parent: BrowserWindow,
    message: string,
    defaultValue?: string,
): Promise<string | null> {
    return new Promise((resolve) => {
        const win = new BrowserWindow({
            width: 360,
            height: 200,
            resizable: false,
            minimizable: false,
            maximizable: false,
            modal: true,
            parent,
            show: false,
            frame: false,
            alwaysOnTop: true,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
            },
        });

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: sans-serif;
            margin: 0; padding: 20px;
            display: flex; flex-direction: column;
            gap: 10px;
          }
          input {
            padding: 8px; border: none; border-radius: 4px;
          }
          button {
            padding: 6px 12px;
            border: none; border-radius: 4px;
            cursor: pointer;
          }
          .buttons { display: flex; justify-content: flex-end; gap: 10px; }
        </style>
      </head>
      <body>
        <h1 id="msg">${message}</h1>
        <input id="input" autofocus />
        <div class="buttons">
          <button id="cancel">Cancel</button>
          <button id="ok">OK</button>
        </div>
        <script>
          const { ipcRenderer } = require('electron');
          const msg = document.getElementById('msg');
          const input = document.getElementById('input');
          const params = ${JSON.stringify({ message, defaultValue })};
          input.value = params.defaultValue ?? '';
          const send = (value) => ipcRenderer.send('native:prompt:response', value);
          document.getElementById('ok').onclick = () => send(input.value);
          document.getElementById('cancel').onclick = () => send(null);
          window.onkeydown = e => {
            if (e.key === 'Enter') send(input.value);
            if (e.key === 'Escape') send(null);
          };
        </script>
      </body>
      </html>
    `;

        win.loadURL(
            `data:text/html;base64,${Buffer.from(html).toString("base64")}`,
        );
        win.once("ready-to-show", () => win.show());

        const responseHandler = (_: any, value: string | null) => {
            resolve(value);
            ipcMain.removeListener("native:prompt:response", responseHandler);
            if (!win.isDestroyed()) win.close();
        };

        ipcMain.on("native:prompt:response", responseHandler);

        parent.on("closed", () => {
            if (!win.isDestroyed()) win.close();
        });

        win.on("closed", () => {
            ipcMain.removeListener("native:prompt:response", responseHandler);
            resolve(null);
        });
    });
}
