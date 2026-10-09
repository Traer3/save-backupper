import { ipcMain } from 'electron'
import { authorizationService } from '../services/authorizationService'

export function authorizationIps(): void {
  ipcMain.handle('try-login', async () => {
    return await authorizationService.login()
  })

  ipcMain.handle('logout', async () => {
    return await authorizationService.deleteToken()
  })

  ipcMain.handle('checkToken', async () => {
    return await authorizationService.checkTokenHealth()
  })
}
