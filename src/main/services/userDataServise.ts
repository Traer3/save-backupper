import path from 'path'
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
    if (!newData || newData.length === 0) {
      console.log('Missing input data')
    }
    const dataFileId = await driverSerivice.getOrCreateDataFile()
    const oldData = await driverSerivice.readJsonFile(dataFileId)
    const newUserData = [...(oldData ?? [])]
    const index = newUserData.findIndex(item => item.gameName)

    console.log('oldJson: ', oldData)

    const newDataJson = JSON.parse(newData)
    const cleanPath = path.normalize(newDataJson.gamePath)

    // const newUserData = (oldData as []).map((element) => {
    //   console.log('element: ', element?.['gameName'])
    //   if(element?.['gameName'] === newDataJson.gameName){
    //     element = {...newDataJson}
    //   }
    // })

    // for (let i = 0; i < oldData.length; i++) {
    //   const obj = oldData[i]
    //   if (obj?.['gameName'] === newDataJson.gameName) {
    //     //oldData[i] = {...newDataJson}
    //     console.log('obj: ', obj)
    //   }
    // }

    //console.log('newData:', newDataJson)
    //console.log('newUserData:', cleanPath)
    //console.log('newUserData:', newUserData)

    // const newDataJson = [
    //   {
    //     gameName: 'DarkSouls II',
    //     gamePath: 'C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII',
    //     backupDelay: '43200'
    //   },
    //     {
    //     gameName: 'DarkSouls III',
    //     gamePath: 'C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsIII',
    //     backupDelay: '63200'
    //   }
    // ]

    // await driverSerivice.updateJsonFile(dataFileId, newDataJson)
  }
}

export const userDataService = new UserDataService()
