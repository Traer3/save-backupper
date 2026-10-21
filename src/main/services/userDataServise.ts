import { driverSerivice } from './googleDiskService'

export class UserDataService {
  //"{"gameName": "DarkSouls II","gamePath": "C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII","backupDelay": "43200"}"

  async readDataJson(): Promise<[]> {
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const userData = await driverSerivice.readJsonFile(dataFileId)
    console.log('userData: ', userData)
    return userData as []
  }

  async changeUserData(newData: string): Promise<void> {
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const oldJson = await driverSerivice.readJsonFile(dataFileId)
    console.log('oldJson: ', oldJson)
    const newDataJson = JSON.parse(newData)
    // меняю
    await driverSerivice.updateJsonFile(dataFileId, newDataJson)
  }
}

export const userDataService = new UserDataService()
