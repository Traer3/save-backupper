import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  readJson: <T = unknown>(fileName: string) => Promise<T | null>
  tryLogin: <T = unknown>() => Promise<T>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
