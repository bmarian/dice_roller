const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu} = electron;

let main;
let mode = "development"; //development - release

// Listen for app to be ready
app.on("ready", function () {
    // Create new window
    main = new BrowserWindow({
        width: 1280,
        height: 720
    });
    // Load html into window
    main.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Quit app when closed
    main.on("closed", function () {
        app.quit();
    });

    if (mode === "release") {
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        Menu.setApplicationMenu(mainMenu);
    } else {
        main.webContents.openDevTools();
    }
});

// Menu template
const mainMenuTemplate = [];