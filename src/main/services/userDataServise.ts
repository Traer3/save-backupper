import path from 'path'
import { driverSerivice } from './googleDiskService'

export interface UserDataEntry {
  gameName: string
  gamePath: string
  backupDelay: string
}
export class UserDataService {
  async readDataJson(): Promise<[]> {
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const userData = await driverSerivice.readJsonFile(dataFileId)
    console.log('userData: ', userData)
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
    const index = newUserData.findIndex((item) => item.gameName === newDataJson.gameName)

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
}

export const userDataService = new UserDataService()
