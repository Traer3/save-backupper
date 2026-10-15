import { ipcMain } from 'electron'
import { filesService } from '../services/filesService'
import { archiveServise } from '../services/archiveServise'

export function filesServiceIps(): void {
  ipcMain.handle('get-folder-info', async (_, folderPath: string) => {
    await filesService.main(folderPath)
  })

  ipcMain.handle('archive', async (_, sourceDir: string, outZipPath: string) => {
    const FileInfo = await archiveServise.createZipArchive(sourceDir, outZipPath)
    return FileInfo
  })

  ipcMain.handle('extract_archive', async (_, sourceDir: string, outZipPath: string) => {
    const FileInfo = await archiveServise.extractZipArchive(sourceDir, outZipPath)
    return FileInfo
  })
}
