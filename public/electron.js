const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipc = electron.ipcMain;

ipc.on('getEncoded', (event, args) => {
    var bitmap = fs.readFileSync(args);
    // convert binary data to base64 encoded string
    var stringResponse = new Buffer(bitmap).toString('base64');
    event.returnValue(stringResponse);
})

let mainWindow;
function createWindow() {
    //console.log(base64_encode("/Users/bryanfrancotte/Documents/Clients/Chambord/assets-picture/william-krause-0zERrbey8XM-unsplash.png"))
    //console.log(base64_encode(new URL("https://i.imgur.com/HGt186t.png")))
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
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