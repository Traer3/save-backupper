import { ipcMain } from 'electron'
import { toolsService } from '../services/toolsService'
import { authorizationService } from '../services/authorizationService'

export function toolsIps(): void {
  ipcMain.handle('read-json', async (_, fileName: string) => {
    const FileInfo = await toolsService.readMyFile(fileName)
    return FileInfo
  })

  ipcMain.handle('try-login', async () => {
    return await authorizationService.login()
  })
}
