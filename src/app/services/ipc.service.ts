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

  sendClose() {
    this.ipcRenderer.send('close');
  }

  sendMinimize() {
    this.ipcRenderer.send('minimize');
  }
}
