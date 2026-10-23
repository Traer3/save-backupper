import { toolsService } from './toolsService'
import { driverSerivice } from './googleDiskService'

export class FilesService {
  private async getFolderInfo(folderPath: string): Promise<[]> {
    try {
      console.log('Reading this path', folderPath)
      const folderData = await toolsService.getFiles(folderPath)
      console.log(`Results:\n${folderData}`)
      return folderData as []
    } catch (err) {
      console.log(`Error while reading game save folder: \n ${err}`)
      return []
    }
  }

  async folderPathData(folderPath: string): Promise<[]> {
    if (!folderPath || folderPath.length <= 0) return []
    const files = await this.getFolderInfo(folderPath)
    const filePaths = files.map((file) => {
      const path = `${folderPath}\\${file}`
      return path
    })
    console.log('filePaths: ', filePaths)
    return filePaths as []
  }

  async uploadInfo(filePaths: []): Promise<boolean> {
    try {
      console.log('Files path: ', filePaths)
      for (let i = 0; i < filePaths.length; i++) {
        const filePath = filePaths[i]
        console.log('filePath', filePath)
        await driverSerivice.uploadToMainFolder(filePath)
      }
      return true
    } catch (err) {
      console.log(`Error while uploading save folders: \n ${err}`)
      return false
    }
  }

  async main(folderPath: string): Promise<boolean> {
    try {
      const filePaths = await this.folderPathData(folderPath)
      const answer = await this.uploadInfo(filePaths)
      console.log('response: ', answer)
      return true 
    } catch (err) {
      console.log(`Error while working in main: \n ${err}`)
      return false
    }
  }
}

export const filesService = new FilesService()
