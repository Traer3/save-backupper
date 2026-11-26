import { archiveService } from './archiveService'
import { driverSerivice } from './googleDiskService'
import { toolsService } from './toolsService'
import os from 'os'
import path from 'path'
import { UserDataEntry, userDataService } from './userDataService'
import { app } from 'electron'

interface TempBackupPaths {
  tempZipPath: string
  archiveFileName: string
  cleanPath: string
}

export class BackupUploaderService {
  private async deleteOldBackups(subFolderId: string): Promise<void> {
    const backupIds = await driverSerivice.filesInSubFolder(subFolderId)
    if (backupIds && backupIds.length >= 5) {
      const idForDeletion = backupIds[backupIds.length - 1]
      if (idForDeletion?.id) {
        await driverSerivice.deleteInDrive(idForDeletion.id)
        // console.log(`id: ${idForDeletion} deleted!`)
      }
    }
  }

  tempPath(str: string): TempBackupPaths | null {
    if (!str) return null
    const cleanPath = path.normalize(str)
    const actualFolderName = path.basename(cleanPath)
    const archiveFileName = `${actualFolderName}.zip`
    const tempZipPath = path.join(os.tmpdir(), archiveFileName)
    return { tempZipPath, archiveFileName, cleanPath }
  }

  async uploadBackup(folderPath: string, folderName: string): Promise<void> {
    const paths = this.tempPath(folderPath)
    if (!paths) {
      throw new Error(`Folder path is empty`)
    }
    const { tempZipPath, archiveFileName, cleanPath } = paths
    try {
      await archiveService.createZipArchive(cleanPath, tempZipPath)
      const mainFolderId = await driverSerivice.getOrCreateAppFolder()
      const backupFolderId = await driverSerivice.createSubFolder(mainFolderId, folderName)
      await this.deleteOldBackups(backupFolderId)

      await driverSerivice.uploadFileToFolder(backupFolderId, tempZipPath, archiveFileName)
    } catch (err) {
      // console.log(`Error during backup upload pipeline: \n ${err}`)
      const errMessage = err instanceof Error ? err.message : String(err)
      throw new Error(`Failed to update backup for ${folderName}: \n ${errMessage}`)
    } finally {
      await toolsService.deleteFile(tempZipPath).catch((err) => {
        console.warn(`Could not cleanup temp file ${tempZipPath}:\n${err}`)
      })
    }
  }

  async archiveAll(): Promise<void> {
    const tempPathArray: string[] = []
    const userData: UserDataEntry[] = await userDataService.readDataJson()
    if (!userData || userData.length === 0) throw new Error('UserData is empty')
    const tempBackupData = userData.map((backup) => {
      return this.tempPath(backup.gamePath)
    })

    for (let i = 0; i < tempBackupData.length; i++) {
      const current = tempBackupData[i]
      if (!current) throw new Error(`Empty backup path`)
      try {
        const { tempZipPath, archiveFileName, cleanPath } = current
        await archiveService.createZipArchive(cleanPath, tempZipPath)
        tempPathArray.push(tempZipPath)
        console.log(`Created archive for: ${archiveFileName}`)
      } catch (err) {
        console.log(`Error with ${tempBackupData[i]?.archiveFileName} , ${err}`)
      }
    }

    try {
      const userDataFile = `userData.json`
      const tempUserDataFile = path.join(os.tmpdir(), userDataFile)
      tempPathArray.push(tempUserDataFile)
      console.log('tempUserDataFile: ', tempUserDataFile)
      await toolsService.writeFile2(tempUserDataFile, userData)
      const cleanDesktopPath = path.join(app.getPath('desktop'), 'BIGzip.zip')
      //console.log('cleanDesktopPath: ',cleanDesktopPath)
      console.log(`Creating BIG zip`)
      await archiveService.createZipFromFiles(tempPathArray, cleanDesktopPath)
      console.log(`Big zip created in ${cleanDesktopPath}`)
    } catch (err) {
      console.log(`Error while creating BIGzip: ${err}`)
    } finally {
      console.log(`Deleting temp zips..`)
      for (let i = 0; i < tempPathArray.length; i++) {
        const element = tempPathArray[i]
        await toolsService.deleteFile(element).catch((err) => {
          console.warn(`Could not cleanup temp file ${element}:\n${err}`)
        })
      }
      console.log(`Temp zips deleted!`)
    }
  }
}

export const backupUploaderService = new BackupUploaderService()
