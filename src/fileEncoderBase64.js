import { ipcMain } from "electron";

const electron = require("electron");
const fs = require("fs");
const ipc = electron.ipcMain;

// ipc.on('getEncoded', (event, args) => {
//     var bitmap = fs.readFileSync(args);
//     // convert binary data to base64 encoded string
//     var stringResponse = new Buffer(bitmap).toString('base64');
//     event.returnValue(stringResponse);
// })

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}