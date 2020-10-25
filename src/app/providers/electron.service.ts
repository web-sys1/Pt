import { Injectable } from '@angular/core';
import { ModalService } from './modal-service/modal-service.service';
import { OnTrigger } from '../modal-dialog';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, ipcMain, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { ModalServiceModule } from './modal-service/modal-service.module';

@Injectable()
export class ElectronService {
  ipcMain: typeof ipcMain;
  ipcRenderer: typeof ipcRenderer;
  modalService: typeof ModalService;
  webFrame: typeof webFrame;
  // modalService: typeof ModalService;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor() {
    // Conditional imports create Light

    if (this.isElectron()) {
      this.modalService = ModalService;
      this.ipcMain = window.require('electron').ipcMain;
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  isElectron() {
    return window && window.process && window.process.type;
  }

  sendMessage(payload: { title: string; body: string }) {
      this.ipcRenderer.send('message', payload);
  }
}
