import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  tryLogin: () => ipcRenderer.invoke('try-login'),
  logout: () => ipcRenderer.invoke('logout'),
  checkToken: () => ipcRenderer.invoke('checkToken'),
  createFolder: () => ipcRenderer.invoke('try-create-folder'),
  uploadFile: (fileName: string) => ipcRenderer.invoke('uploadFile', fileName),
  deleteMainFolder: () => ipcRenderer.invoke('filesInMainFolder'),
  filesInMainFolder: () => ipcRenderer.invoke('filesInMainFolder')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
