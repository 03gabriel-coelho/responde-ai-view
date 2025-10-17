const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("renderer/index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("fetch-html", async (event, url) => {
  try {
    const response = await axios.get(url);
    let html = response.data;

    // 🧹 Exemplo: remove blur
    html = html.replace(/filter:\s*blur\(.*?\);?/gi, "filter: none;");

    // 💾 Salva arquivo temporário
    // const filePath = path.join(__dirname, 'temp', 'result.html');
    // fs.writeFileSync(filePath, html, 'utf-8');
    // const dir = path.join(__dirname, "temp");
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir); // cria a pasta "temp" se não existir
    // }

    // const filePath = path.join(dir, "result.html");
    // fs.writeFileSync(filePath, html, "utf-8");

    // // 🌐 Abre no navegador padrão
    // shell.openPath(filePath);
    const dir = path.join(app.getPath("userData"), "temp");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, "result.html");
    fs.writeFileSync(filePath, html, "utf-8");

    shell.openPath(filePath);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
});
