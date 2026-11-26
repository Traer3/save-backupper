import path from 'path'
import { driverSerivice } from './googleDiskService'
import { toolsService } from './toolsService'

export interface UserDataEntry {
  gameName: string
  gamePath: string
  backupDelay: string
}
export class UserDataService {
  async readDataJson(): Promise<[]> {
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const userData = await driverSerivice.readJsonFile(dataFileId)
    return userData as []
  }

  async changeUserData(newData: string): Promise<void> {
    if (!newData || newData.length === 0) {
      console.log('Missing input data')
      return
    }

    const newDataJson: UserDataEntry = JSON.parse(newData)
    newDataJson.gamePath = path.normalize(newDataJson.gamePath)

    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const oldData = await driverSerivice.readJsonFile<UserDataEntry[]>(dataFileId)

    const newUserData: UserDataEntry[] = [...(oldData ?? [])]

    const index = newUserData.findIndex(
      (item) => toolsService.clearStr(item.gameName) === toolsService.clearStr(newDataJson.gameName)
    )

    if (index !== -1) {
      console.log(`Updating existing entry for game :${newDataJson.gameName}`)
      newUserData[index] = newDataJson
    } else {
      console.log(`Adding new entry for game: ${newDataJson.gameName}`)
      newUserData.unshift(newDataJson)
    }

    await driverSerivice.updateJsonFile(dataFileId, newUserData)
    // const newUserData = [
    //   {
    //     gameName: 'DarkSouls II',
    //     gamePath: 'C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII',
    //     backupDelay: '43200'
    //   },
    //   {
    //     gameName: 'DarkSouls III',
    //     gamePath: 'C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsIII',
    //     backupDelay: '63200'
    //   }
    // ]
  }

  async deleteItem(gameName: string): Promise<void> {
    if (!gameName || gameName.length === 0) {
      console.log('Missing input data')
      throw new Error('Missing input data')
    }

    try {
      const folderId = await driverSerivice.backupFolderId(gameName)
      if (folderId) {
        await driverSerivice.deleteInDrive(folderId)
      }
      const dataFileId = await driverSerivice.getOrCreateDataFile()
      const oldData = await driverSerivice.readJsonFile<UserDataEntry[]>(dataFileId)
      const userData: UserDataEntry[] = [...(oldData ?? [])]

      const newUserData = userData.filter((gameBackup) => gameBackup.gameName !== gameName)
      await driverSerivice.updateJsonFile(dataFileId, newUserData)

      //console.log(`FolderDeleted!`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      throw new Error(`Failed to delete item ${gameName}: ${message}`)
    }
  }
}

export const userDataService = new UserDataService()
