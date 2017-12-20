'use strict'

const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

// set env
// process.env.NODE_ENV = 'production';

let mainWindow;
let tray = null;

// listen for app to be ready
app.on('ready', () => {
  // create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      experimentalFeatures: true,
      nodeIntegrationInWorker: true
    },
    width: 1280,
    height: 720,
    resizable: false,
  });
  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // quit app when closed
  mainWindow.on('closed', () => app.quit())
  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
  {
    label: 'plik',
    submenu: [
      {
        label: 'reset',
        click() {
          console.log('click');
        }
      },
      {
        label: 'pokaż wszystko',
        click() {
          console.log('click');
        }
      },
      {
        label: 'zakończ',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

mainMenuTemplate.push({
  label: 'system',
  submenu: [
    {
      label: 'Procesor',
      accelerator: process.platform == 'darwin' ? 'Command+U' : 'Ctrl+U',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Płyta Główna',
      accelerator: process.platform == 'darwin' ? 'Command+B' : 'Ctrl+B',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Pamięć',
      accelerator: process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Dyski',
      accelerator: process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Karta Graficzna',
      accelerator: process.platform == 'darwin' ? 'Command+G' : 'Ctrl+G',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Sieć',
      accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Użytkownicy',
      accelerator: process.platform == 'darwin' ? 'Command+E' : 'Ctrl+E',
      click() {
        console.log('click');
      }
    },
    {
      label: 'System Operacyjny',
      accelerator: process.platform == 'darwin' ? 'Command+Y' : 'Ctrl+Y',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Wszystko',
      accelerator: process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Użycie',
      accelerator: process.platform == 'darwin' ? 'Command+K' : 'Ctrl+K',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Wyczyść',
      accelerator: process.platform == 'darwin' ? 'Command+J' : 'Ctrl+J',
      click() {
        console.log('click');
      }
    },
    {
      label: 'Zapisz',
      accelerator: process.platform == 'darwin' ? 'Command+S' : 'Ctrl+S',
      click() {
        console.log('click');
      }
    },
  ]
});

// fixing menu on mac
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
};

// add dev tools in development 
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'narzędzia',
    submenu: [
      {
        label: 'pokaż/schowaj',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
};