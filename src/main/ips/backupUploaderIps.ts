import { ipcMain } from 'electron'
import { backupUploaderService } from '../services/backupUploaderService'

export function backupUploaderIps(): void {
  ipcMain.handle('upload-backup-to-google', async (_, folderPath: string, folderName: string) => {
    await backupUploaderService.uploadBackup(folderPath, folderName)
  })

  ipcMain.handle('archive-all', async () => {
    await backupUploaderService.archiveAll()
  })
  //   ipcMain.handle('get-folder-info', async (_, folderPath: string) => {
  //     await filesService.main(folderPath)
  //   })

  //   ipcMain.handle('archive', async (_, sourceDir: string, outZipPath: string) => {
  //     const FileInfo = await archiveServise.createZipArchive(sourceDir, outZipPath)
  //     return FileInfo
  //   })

  //   ipcMain.handle('extract_archive', async (_, sourceDir: string, outZipPath: string) => {
  //     const FileInfo = await archiveServise.extractZipArchive(sourceDir, outZipPath)
  //     return FileInfo
  //   })
}
