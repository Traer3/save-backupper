import { ipcMain } from 'electron'
import { toolsService } from '../services/toolsService'
import { systemFoldresServise } from '../services/systemFoldresServise'

export function toolsIps(): void {
  ipcMain.handle('read-json', async (_, fileName: string) => {
    const FileInfo = await toolsService.readMyFile(fileName)
    return FileInfo
  })

  ipcMain.handle('select-backup-folder', async () => {
    return await systemFoldresServise.openSystemFolders()
  })

  ipcMain.handle('open-folder', async (_, folderPath: string) => {
    await systemFoldresServise.openFolder(folderPath)
  })
}
