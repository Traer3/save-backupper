import { ipcMain } from 'electron'
import { filesService } from '../services/filesService'

export function filesServiceIps(): void {
  ipcMain.handle('get-folder-info', async (_, folderPath: string) => {
    await filesService.main(folderPath)
  })

//   ipcMain.handle('uploadFile', async (_, fileName: string) => {
//     await driverSerivice.uploadToMainFolder(fileName)
//   })

}
