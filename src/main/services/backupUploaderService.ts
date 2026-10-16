import { archiveServise } from './archiveServise'
import { driverSerivice } from './googleDiskService'
import { toolsService } from './toolsService'
import os from 'os'
import path from 'path'

export class BackupUploaderService {
  async uploadBackup(folderPath: string, folderName: string): Promise<boolean> {
    const archiveFileName = `${folderName}.zip`
    const cleanPath = path.normalize(folderPath)
    const tempZipPath = path.join(os.tmpdir(), archiveFileName)
    try {
      await archiveServise.createZipArchive(cleanPath, tempZipPath) // сделать проверку , если хуйня уже сущуствует , затем создавать
      const mainFolderId = await driverSerivice.getOrCreateAppFolder()
      const backupFolderId = await driverSerivice.createSubFolder(mainFolderId, folderName)

      const driveResponse = await driverSerivice.uploadFileToFolder(
        backupFolderId,
        tempZipPath,
        archiveFileName
      )

      return Boolean(driveResponse)
    } catch (err) {
      console.log(`Error during backup upload pipeline: \n ${err}`)
      return false
    } finally {
      await toolsService.deleteFile(tempZipPath).catch((err) => {
        console.warn(`Could not cleanup temp file ${tempZipPath}:\n${err}`)
      })
    }
  }
}

export const backupUploaderService = new BackupUploaderService()
