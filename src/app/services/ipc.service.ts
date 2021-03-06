import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private ipcRenderer: any | undefined;;

  constructor() { 
    //@ts-ignore
    if(window.require) {
      //@ts-ignore
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }else {
      console.warn('not running inside electron, ipc not available')
    }
  }

  public on(channel: string, listener: any): void {
    if (!this.ipcRenderer) {
      return;
    }
    this.ipcRenderer.on(channel, listener);
  }

  sendClose() {
    this.ipcRenderer.send('close');
  }

  sendMinimize() {
    this.ipcRenderer.send('minimize');
  }

  sendOpenFile(path: string, args?: string []) {
    this.ipcRenderer.send('openFile', path, args);
  }

  sendAddSteamGamess(path: string) {
    this.ipcRenderer.send('addSteamGames', path);
  }
}
