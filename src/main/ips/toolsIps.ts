import { app, ipcMain } from 'electron'
import { toolsService } from '../services/toolsService'
import { systemFoldresService } from '../services/systemFoldresService'

export function toolsIps(): void {
  ipcMain.handle('read-json', async (_, fileName: string) => {
    const FileInfo = await toolsService.readMyFile(fileName)
    return FileInfo
  })

  ipcMain.handle('select-backup-folder', async () => {
    return await systemFoldresService.openSystemFolders()
  })

  ipcMain.handle('open-folder', async (_, folderPath: string) => {
    await systemFoldresService.openFolder(folderPath)
  })

  ipcMain.handle('auto-launch:get', (): boolean => {
    const settings = app.getLoginItemSettings()
    return Boolean(settings.openAtLogin)
  })

  ipcMain.handle('auto-launch:set', (_, enabled: boolean): boolean => {
    app.setLoginItemSettings({
      openAtLogin: Boolean(enabled)
    })
    return Boolean(app.getLoginItemSettings().openAtLogin)
  })
}
