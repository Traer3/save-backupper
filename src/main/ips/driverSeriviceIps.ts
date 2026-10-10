import { ipcMain } from 'electron'
import { driverSerivice } from '../services/googleDiskService'

export function driverSeriviceIps(): void {
  ipcMain.handle('try-create-folder', async () => {
    await driverSerivice.getOrCreateAppFolder()
  })
}
