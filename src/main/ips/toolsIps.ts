import { ipcMain } from 'electron'
import { toolsService } from '../services/toolsService'

export function toolsIps(): void {
  ipcMain.handle('read-json', async (_, fileName: string) => {
    const FileInfo = await toolsService.readMyFile(fileName)
    return FileInfo
  })
}
