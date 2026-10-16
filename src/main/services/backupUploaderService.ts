import { archiveServise } from './archiveServise'
import { driverSerivice } from './googleDiskService'
import { toolsService } from './toolsService'
import os from 'os'
import path from 'path'

export class BackupUploaderService {
  private async deleteOldBackups(subFolderId: string): Promise<void> {
    const backupIds = await driverSerivice.filesInSubFolder(subFolderId)
    if (backupIds && backupIds.length >= 5) {
      const idForDeletion = backupIds[backupIds.length - 1]
      // console.log('idForDeletion: ', idForDeletion.id)
      if (idForDeletion?.id) {
        await driverSerivice.deleteInDrive(idForDeletion.id)
        // console.log(`id: ${idForDeletion} deleted!`)
      }
    }
  }

  async uploadBackup(folderPath: string, folderName: string): Promise<boolean> {
    const archiveFileName = `${folderName}.zip`
    const cleanPath = path.normalize(folderPath)
    const tempZipPath = path.join(os.tmpdir(), archiveFileName)
    try {
      await archiveServise.createZipArchive(cleanPath, tempZipPath)
      const mainFolderId = await driverSerivice.getOrCreateAppFolder()
      const backupFolderId = await driverSerivice.createSubFolder(mainFolderId, folderName)
      await this.deleteOldBackups(backupFolderId)
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
