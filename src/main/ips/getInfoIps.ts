import { ipcMain } from 'electron'
import { getInfoService } from '../services/getInfoService'
import { userDataService } from '../services/userDataService'
import { activeService } from '../services/activeService'

export function getInfoIps(): void {
  ipcMain.handle('get-last-item-info', async (_, folderName: string) => {
    return await getInfoService.getLastItemTime(folderName)
  })

  ipcMain.handle('read-user-data', async () => {
    return await userDataService.readDataJson()
  })

  ipcMain.handle('change-user-data', async (_, newData: string) => {
    return await userDataService.changeUserData(newData)
  })

  ipcMain.handle('delete-user-data-item', async (_, gameName: string) => {
    return await userDataService.deleteItem(gameName)
  })

  ipcMain.handle('zip-eraser-service', async () => {
    return await activeService.zipEraser()
  })
}
