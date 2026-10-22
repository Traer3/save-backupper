import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  tryLogin: <T = unknown>() => Promise<T>
  logout: <T = unknown>() => Promise<T>
  checkToken: <T = unknown>() => Promise<T>
  createFolder: <T = unknown>() => Promise<T>
  uploadFile: <T = unknown>(fileName: string) => Promise<T>
  deleteMainFolder: <T = unknown>() => Promise<T>
  // filesInMainFolder: <T = unknown>() => Promise<T>
  // textFile: <T = unknown>(textInfo: string) => Promise<T>
  getFolderInfo: <T = unknown>(folderPath: string) => Promise<T>
  archive: <T = unknown>(sourceDir: string, outZipPath: string) => Promise<T>
  extractArchive: <T = unknown>(sourceDir: string, outZipPath: string) => Promise<T>
  backupUploader: <T = unknown>(folderPath: string, folderName: string) => Promise<T>
  getLastItemInfo: <T = unknown>(folderName: string) => Promise<T>
  readUserData: <T = unknown>() => Promise<T>
  changeUserData: <T = unknown>(newData: string) => Promise<T>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
