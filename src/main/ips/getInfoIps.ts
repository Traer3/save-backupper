import { ipcMain } from 'electron'
import { getInfoService } from '../services/getInfoService'

export function getInfoIps(): void {
  ipcMain.handle('get-last-item-info', async (_, folderName: string) => {
    return await getInfoService.getLastItemTime(folderName)
  })
}
