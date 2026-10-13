import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  tryLogin: <T = unknown>() => Promise<T>
  logout: <T = unknown>() => Promise<T>
  checkToken: <T = unknown>() => Promise<T>
  createFolder: <T = unknown>() => Promise<T>
  uploadFile: <T = unknown>(fileName: string) => Promise<T>
  deleteMainFolder: <T = unknown>() => Promise<T>
  filesInMainFolder: <T = unknown>() => Promise<T>
  textFile: <T = unknown>(textInfo: string) => Promise<T>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
