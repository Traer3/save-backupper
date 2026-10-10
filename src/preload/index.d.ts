import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  tryLogin: <T = unknown>() => Promise<T>
  logout: <T = unknown>() => Promise<T>
  checkToken: <T = unknown>() => Promise<T>
  createFolder: <T = unknown>() => Promise<T>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
