import { google, drive_v3 } from 'googleapis'
import { authorizationService } from './authorizationService'

export class DriverService {
  private FOLDER_NAME = 'SaveBackupper'

  private async getDriverClient(): Promise<drive_v3.Drive | null> {
    const authClietn = await authorizationService.checkToken()
    if (!authClietn) {
      console.error(`Error missing authorized user`)
      return null
    }

    return google.drive({ version: 'v3', auth: authClietn })
  }

  async getOrCreateAppFolder(): Promise<string | null> {
    try {
      const driver = await this.getDriverClient()
      if (!driver) return null

      const searchResponse = await driver.files.list({
        q: `name = '${this.FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      })

      const existingFiles = searchResponse.data.files

      if (existingFiles && existingFiles.length > 0) {
        const folderId = existingFiles[0].id!
        console.log(`Folder already exists`)
        return folderId
      }

      console.log(`Missing main folder...\nCreating folder ${this.FOLDER_NAME}`)

      const fileMetadata = {
        name: this.FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder'
      }

      const folderResponse = await driver.files.create({
        requestBody: fileMetadata,
        fields: 'id, name'
      })

      const newFolderId = folderResponse.data.id!
      console.log(`Folder created successfully!`)
      return newFolderId
    } catch (err) {
      console.error(`Error while creating foler in google disk\n`, err)
      return null
    }
  }
}

export const driverSerivice = new DriverService()
