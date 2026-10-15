import { archiveServise } from './archiveServise'
import { driverSerivice } from './googleDiskService'
import { toolsService } from './toolsService'

export class BackupUploaderService {
  async uploadBackup(folderPath: string, folderName: string): Promise<boolean> {
    try {
      const archiveFileName = `${folderName}.zip`
      const newFolderPath = folderPath.replace(/\\/g, '\\\\')
      // console.log("newFolderPath: ", newFolderPath)
      // console.log("folderName: ", folderName)
      const outputDir = `${newFolderPath}\\\\${archiveFileName}` //хуйня только для win , потом ебани через path
      // console.log("outputDir: ", outputDir)
      const archiving = await archiveServise.createZipArchive(newFolderPath, outputDir) // сделать проверку , если хуйня уже сущуствует , затем создавать
      console.log('archiving response: ', archiving)
      if (archiving) {
        const drive = await driverSerivice.getOrCreateAppFolder()
        if (!drive) return false
        const backupFolderId = await driverSerivice.createSubFolder(drive, folderName)
        if (!backupFolderId) return false
        console.log(backupFolderId)
        const driveResponse = await driverSerivice.uploadFileToFolder(
          backupFolderId,
          outputDir,
          archiveFileName
        )
        // console.log('response: ', response)
        if (!driveResponse) return false
        const zipDeletion = await toolsService.deleteFile(outputDir)
        console.log('zipDeletion: ', zipDeletion)
      }
      return true
    } catch (err) {
      console.log(`Error while working in main: \n ${err}`)
      return false
    }
  }
}

export const backupUploaderService = new BackupUploaderService()
