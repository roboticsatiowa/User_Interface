/*
* This script controls logic for the general operation of the Electron framework.
* Controls the loading of Electron and the creation/closing of windows
* Does not perform any logic or operation of the application itself
* */


// Loads Electron API
const { app, BrowserWindow } = require('electron')
const helmet = require("helmet");

require("electron-reload")('html/index.html')
//
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"]
//     }
//   })
// )

// Create new window called win and load index.html
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        minWidth:800,
        minHeight: 600,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadFile('html/index.html')
}

// waites for electron library to finish booting
app.whenReady().then(() => {
  createWindow()

    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// ends process when all windows are closed (only needed for macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
