const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
//const fs = require("fs");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow() {
    //console.log(base64_encode("/Users/bryanfrancotte/Documents/Clients/Chambord/assets-picture/william-krause-0zERrbey8XM-unsplash.png"))
    //console.log(base64_encode(new URL("https://i.imgur.com/HGt186t.png")))
    mainWindow = new BrowserWindow({ 
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            //preload: __dirname + '/preload.js'
        }
    });
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});