const electron = require("electron");
const url = require("url");
const path = require("path");
let ipc = electron.ipcMain;

const {
    app,
    BrowserWindow,
    Menu
} = electron;

let main;
let dm_page;
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

    ipc.on("show-dm-page", function () {
        create_dm_page();
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

function create_dm_page() {
    dm_page = new BrowserWindow({
        width: 850,
        height: 800,
    });

    dm_page.loadURL(url.format({
        pathname: path.join(__dirname, 'dm_page.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (mode === "development") {
        dm_page.webContents.openDevTools();
    }

    // On closing dm page
    dm_page.on("close", function () {
        dm_page = null;
    });
}