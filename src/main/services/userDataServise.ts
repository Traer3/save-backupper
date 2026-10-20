import { driverSerivice } from './googleDiskService'

export class UserDataService {
  //читать файл
  async readDataJson(): Promise<[]> {
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const userData = await driverSerivice.readJsonFile(dataFileId)
    console.log('userData: ', userData)
    return userData as []
  }
  //редактировать файл
}

export const userDataService = new UserDataService()
