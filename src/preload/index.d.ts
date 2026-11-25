import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  tryLogin: <T = unknown>() => Promise<T>
  logout: <T = unknown>() => Promise<T>
  checkToken: <T = unknown>() => Promise<T>
  deleteMainFolder: <T = unknown>() => Promise<T>
  backupUploader: <T = unknown>(folderPath: string, folderName: string) => Promise<T>
  getLastItemInfo: <T = unknown>(folderName: string) => Promise<T>
  readUserData: <T = unknown>() => Promise<T>
  changeUserData: <T = unknown>(newData: string) => Promise<T>
  deleteUserDataItem: <T = unknown>(gameName: string) => Promise<T>
  selectBackupFolder: <T = unknown>() => Promise<T>
  openFolder: <T = unknown>(folderPath: string) => Promise<T>
  getAutoLaunch: <T = unknown>() => Promise<T>
  setAutoLaunch: <T = unknown>(enabled: boolean) => Promise<T>
  archiveAll: <T = unknown>() => Promise<T>
  zipEraserService: <T = unknown>() => Promise<T>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
