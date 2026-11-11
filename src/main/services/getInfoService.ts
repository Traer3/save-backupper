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
    //if (!info || info.length === 0) throw new Error(`Folder ${folderName} is empty`)
    if (!info || info.length === 0) {
      return '0'
    }
    const lastItemTime = info[0]?.createdTime
    return lastItemTime || '0'
  }
}

export const getInfoService = new GetInfoService()
