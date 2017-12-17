// @flow
import { app, Tray, Menu, BrowserWindow } from 'electron';
import path from 'path';

const iconPath = path.join(__dirname, '/static/icon.png');

export default class TrayBuilder {
  tray: any;
  mainWindow: any;

  constructor(tray: {}, mainWindow: {}) {
    this.tray = tray;
    this.mainWindow = mainWindow;
  }

  buildTray() {
    const win = new BrowserWindow({ show: false });
    this.tray = new Tray(iconPath);

    const trayMenu = Menu.buildFromTemplate([
      {
        label: 'Toggle Crypto Ticker',
        click: () => this.mainWindow.visible() ? this.mainWindow.hide() : this.mainWindow.show()
      }, {
        label: 'Quit Crypto Ticker',
        click: () => { app.quit(); }
      }
    ]);

    this.tray.setContextMenu(trayMenu);
  }
}
