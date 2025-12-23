const { warn } = require("console");
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 760,
    fullscreenable: false,
    autoHideMenuBar: true,
    maxHeight: 760,
    maxWidth: 1080,
    minHeight: 760,
    minWidth: 760,
    icon: path.join(__dirname, "public", "img/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "electron.preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);

  // Punta alla build di Angular
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:4200"); // Angular dev server
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "dist/metabolomics/browser/index.html"));
  }
}

// --- Qui inserisci l'handler IPC ---
ipcMain.handle("export-pdf", async (event, payload) => {
  debugger;
  const { htmlContent, fileName } = payload;
  // Finestra invisibile per il PDF
  const pdfWin = new BrowserWindow({ show: false });

  await pdfWin.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`
  );

  // Apri dialog per scegliere la cartella
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (canceled || !filePaths.length) {
    pdfWin.close();
    throw new Error("Salvataggio annullato");
  }

  const folderPath = filePaths[0];
  const pdfPath = path.join(folderPath, fileName);

  const pdfData = await pdfWin.webContents.printToPDF({
    printBackground: true,
    marginsType: 0,
    pageSize: "A4",
  });

  fs.writeFileSync(pdfPath, pdfData);
  pdfWin.close();

  return pdfPath;
});

// Hot reload per Electron in sviluppo
if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
