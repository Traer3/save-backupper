import { ipcMain } from 'electron'
import { driverSerivice } from '../services/googleDiskService'

export function driverSeriviceIps(): void {
  ipcMain.handle('try-create-folder', async () => {
    await driverSerivice.getOrCreateAppFolder()
  })

  ipcMain.handle('uploadFile', async (_, fileName: string) => {
    await driverSerivice.uploadToMainFolder(fileName)
  })

  ipcMain.handle('deleteMainFolder', async () => {
    await driverSerivice.deleteMainFolder()
  })

  ipcMain.handle('filesInMainFolder', async () => {
    await driverSerivice.filesInMainFolder()
  })

  ipcMain.handle('textFile', async (_, textInfo: string) => {
    await driverSerivice.textFile(textInfo)
  })
}
