import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  tryLogin: () => ipcRenderer.invoke('try-login'),
  logout: () => ipcRenderer.invoke('logout'),
  checkToken: () => ipcRenderer.invoke('checkToken'),
  deleteMainFolder: () => ipcRenderer.invoke('deleteMainFolder'),
  backupUploader: (folderPath: string, folderName: string) =>
    ipcRenderer.invoke('upload-backup-to-google', folderPath, folderName),
  getLastItemInfo: (folderName: string) => ipcRenderer.invoke('get-last-item-info', folderName),
  readUserData: () => ipcRenderer.invoke('read-user-data'),
  changeUserData: (newData: string) => ipcRenderer.invoke('change-user-data', newData),
  deleteUserDataItem: (gameName: string) => ipcRenderer.invoke('delete-user-data-item', gameName),
  selectBackupFolder: () => ipcRenderer.invoke('select-backup-folder'),
  openFolder: (folderPath: string) => ipcRenderer.invoke('open-folder', folderPath),
  getAutoLaunch: () => ipcRenderer.invoke('auto-launch:get'),
  setAutoLaunch: (enabled: boolean) => ipcRenderer.invoke('auto-launch:set', enabled),
  archiveAll: () => ipcRenderer.invoke('archive-all'),
  zipEraserService: () => ipcRenderer.invoke('zip-eraser-service')
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
