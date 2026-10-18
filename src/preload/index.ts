import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  tryLogin: () => ipcRenderer.invoke('try-login'),
  logout: () => ipcRenderer.invoke('logout'),
  checkToken: () => ipcRenderer.invoke('checkToken'),
  createFolder: () => ipcRenderer.invoke('try-create-folder'),
  uploadFile: (fileName: string) => ipcRenderer.invoke('uploadFile', fileName),
  deleteMainFolder: () => ipcRenderer.invoke('filesInMainFolder'),
  filesInMainFolder: () => ipcRenderer.invoke('filesInMainFolder'),
  textFile: (textInfo: string) => ipcRenderer.invoke('textFile', textInfo),
  getFolderInfo: (folderPath: string) => ipcRenderer.invoke('get-folder-info', folderPath),
  archive: (sourceDir: string, outZipPath: string) =>
    ipcRenderer.invoke('archive', sourceDir, outZipPath),
  extractArchive: (sourceDir: string, outZipPath: string) =>
    ipcRenderer.invoke('extract_archive', sourceDir, outZipPath),
  backupUploader: (folderPath: string, folderName: string) =>
    ipcRenderer.invoke('upload-backup-to-google', folderPath, folderName),
  getLastItemInfo: (folderName: string) => ipcRenderer.invoke('get-last-item-info', folderName)
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
