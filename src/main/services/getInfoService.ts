import { drive_v3 } from 'googleapis'
import { driverSerivice } from './googleDiskService'

export class GetInfoService {
  private async getSubFolderInfo(folderName: string): Promise<drive_v3.Schema$File[]> {
    const mainFolderId = await driverSerivice.getOrCreateAppFolder()
    const backupFolderId = await driverSerivice.createSubFolder(mainFolderId, folderName)
    const info = await driverSerivice.folderFilesInfo(backupFolderId)
    if (!info) throw new Error(`Cant get info from folder ${folderName}`)
    return info
  }

  async getLastItemTime(folderName: string): Promise<string> {
    const info = await this.getSubFolderInfo(folderName) //createdTime
    if (!info || info.length === 0) throw new Error(`Folder ${folderName} is empty`)
    const lastItemTime = info[info.length - 1]?.createdTime
    if (!lastItemTime) {
      return '0'
    }

    return lastItemTime
  }
}

export const getInfoService = new GetInfoService()
