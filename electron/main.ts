import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { spawnSync } from "node:child_process";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 300,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.animate.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  win.webContents.openDevTools();

  // windows隐藏默认菜单栏
  // win.setMenuBarVisibility(false);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app
  .whenReady()
  .then(() => {
    const getWlans = () => {
      const res = spawnSync("netsh", ["interface", "show", "interface"], {
        shell: process.env.ComSpec,
        stdio: ["pipe", "pipe", "pipe"],
      });

      const str = res.stdout.toString();

      const lines = str.split("\n");
      const data = [];

      // Skip the first two lines (headers) and start from the third line
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [adminState, state, type, interfaceName] = line.split(/\s+/);
          data.push({
            state: adminState,
            State: state,
            Type: type,
            name: interfaceName,
          });
        }
      }
      return data.slice(1);
    };

    ipcMain.handle("getWlans", getWlans);

    ipcMain.handle("checkIps", () => {
      return;
    });

    ipcMain.handle("init", () => {
      win?.webContents.send("init", "init");
    });

    return;
  })
  .then(createWindow);
