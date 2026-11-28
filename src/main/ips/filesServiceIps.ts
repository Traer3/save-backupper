import { ipcMain } from 'electron'
import { filesService } from '../services/filesService'
import { archiveService } from '../services/archiveService'

export function filesServiceIps(): void {
  ipcMain.handle('get-folder-info', async (_, folderPath: string) => {
    await filesService.main(folderPath)
  })

  ipcMain.handle('archive', async (_, sourceDir: string, outZipPath: string) => {
    const FileInfo = await archiveService.createZipArchive(sourceDir, outZipPath)
    return FileInfo
  })

  ipcMain.handle('extract_archive', async (_, sourceDir: string, outZipPath: string) => {
    const FileInfo = await archiveService.extractZipArchive(sourceDir, outZipPath)
    return FileInfo
  })

  ipcMain.handle('create_offline_archive', async (_, sourceDir: string, gameName: string) => {
    await archiveService.createOfflineZip(sourceDir, gameName)
  })
}
